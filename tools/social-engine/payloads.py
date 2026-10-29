"""Build Metricool createScheduledPost payloads from content.py + out/manifest.json.
Usage: python3 payloads.py <batch-folder-name>   (media served at https://www.bycharlottesmith.com/social/<batch>/)
Writes calls.json: [{key, date, info}] ready for createScheduledPost (blogId 7336333)."""
import json, sys, os
import content

batch = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
MAN = sys.argv[3] if len(sys.argv) > 3 else "out"
m = {x["idx"]: x for x in json.load(open(os.path.join(HERE, MAN, "manifest.json")))}
BASE = f"https://www.bycharlottesmith.com/social/{batch}/"
OFFSET = sys.argv[2] if len(sys.argv) > 2 else "+01:00"  # Malta: +01:00 winter, +02:00 summer
calls = []
for i, p in enumerate(content.P):
    if i not in m: continue
    files = m[i]["files"]; media = [BASE + f for f in files]; net = p["net"]
    info = dict(autoPublish=True, draft=False, descendants=[], firstCommentText="", hasNotReadNotes=False,
                shortener=False, smartLinkData={"ids": []}, media=media, mediaAltText=[],
                providers=[{"network": net}],
                publicationDate={"dateTime": f"{p['date']}T{p['time']}:00", "timezone": "Europe/Malta"})
    if net == "instagram":
        info["text"] = "" if p["fmt"] == "STORY" else p["text"]
        info["instagramData"] = {"type": p["fmt"], "isAiGenerated": False}
        if p["fmt"] == "REEL":
            info["instagramData"]["showReelOnFeed"] = True
            info["videoThumbnailUrl"] = BASE + files[0].replace(".mp4", "_cover.jpg")
    elif net == "facebook":
        info["text"] = p["text"]; info["facebookData"] = {"type": p["fmt"]}
    elif net == "linkedin":
        info["text"] = p["text"]; info["linkedinData"] = {"type": "post", "previewIncluded": True}
        if len(media) > 1:
            info["linkedinData"].update(publishImagesAsPDF=True, documentTitle=p.get("li_pdf", "By Charlotte Smith"))
    elif net == "gmb":
        info["text"] = p["text"]; info["gmbData"] = {"type": "publication"}
    elif net == "tiktok":
        info["text"] = p["text"]
        info["tiktokData"] = {"privacyOption": "PUBLIC_TO_EVERYONE", "disableComment": False, "disableDuet": False,
                              "disableStitch": False, "autoAddMusic": False, "isAigc": False,
                              "title": p["visual"]["lines"][0][:90]}
    calls.append(dict(key=m[i]["key"], date=f"{p['date']}T{p['time']}:00{OFFSET}", info=json.dumps(info, ensure_ascii=False)))
json.dump(calls, open(os.path.join(HERE, "calls.json"), "w"), ensure_ascii=False, indent=0)
print(len(calls), "payloads")
