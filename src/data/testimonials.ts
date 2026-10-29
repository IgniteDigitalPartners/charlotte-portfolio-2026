// Client testimonials shown on the homepage. The section stays hidden until at least one is added.
// Only add genuine quotes that the client has approved for publication.
export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
}

export const testimonials: Testimonial[] = [];
