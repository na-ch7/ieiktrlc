import { Link, RichTextBlock, PrismicDate } from "prismic-reactjs";

export type PrismicImage = {
  url?: string;
  alt?: string;
  copyright?: string | null;
  dimensions?: {
    width: number;
    height: number;
  };
};

export interface Config {
  organization: RichTextBlock[];
  contact_number: string;
  email: string;
  address: RichTextBlock[];
}

export type Section = {
  title: RichTextBlock[];
  body: RichTextBlock[];
};

// @page
export interface Home {
  slides: { image: PrismicImage }[];
  sections: Section[];
  leadership: {
    image: PrismicImage;
    name: RichTextBlock[];
    designation: RichTextBlock[];
  }[];
}

type Member = {
  name: RichTextBlock[];
  membership_number: string;
  division: RichTextBlock[];
  email: string;
  contact_number: string;
  redact_email: boolean;
  redact_contact_number: boolean;
  headshot: PrismicImage;
  leadership: boolean;
};

type Image = {
  image: PrismicImage;
};

// @page
export interface Images {
  image: Image[];
}

export interface Members {
  members: Member[];
}

export interface Activity {
  title: RichTextBlock[];
  body: RichTextBlock[];
  image: PrismicImage;
}

// @page
export interface Activities {
  activities: Activity[];
}

export interface NewsItem {
  title: RichTextBlock[];
  src: Link;
  image: PrismicImage;
  description: RichTextBlock[];
}

export interface EventItem {
  title: RichTextBlock[];
  image: PrismicImage;
  description: RichTextBlock[];
  datetime: PrismicDate;
  content: RichTextBlock[];
  event_slug: string;
}

// @page
export interface Events {
  events: EventItem[];
}

// @page
export interface News {
  news: NewsItem[];
}
