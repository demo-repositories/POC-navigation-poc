export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface InternationalizedString {
  _type: "internationalizedString";
  value: string;
  language: string;
}

export interface SanityLink {
  _type: "link";
  type: "url" | "reference";
  url?: string;
  reference?: {
    _type: "reference";
    _ref: string;
    _weak?: boolean;
  };
}

export interface InternationalizedLink {
  _type: "internationalizedArrayLink";
  value: SanityLink;
  language: string;
}

export interface SanitySubmenuItem {
  _type: "submenuItem";
  title: InternationalizedString[];
  link?: InternationalizedLink[];
}

export interface SanityNavigationItem {
  _type: "navigationItem";
  visibility?: ("JP" | "EU" | "NA" | "APAC")[];
  title: InternationalizedString[];
  link?: InternationalizedLink[];
  children?: SanityNavigationItem[];
}

export interface SanityHeader {
  _id: string;
  _type: "header";
  logo: SanityImage;
  logoAlt: string;
  navigation: SanityNavigationItem[];
}

export interface SanityCategory {
  _id: string;
  _type: "category";
  title: string;
  featuredProducts?: string;
  centraId?: string;
  level: number;
  description?: string;
  content?: Array<{
    _type: "feature" | "grid" | "textBlock" | "cta" | "imageWithAlt" | "video";
    [key: string]: any;
  }>;
  children?: Array<{
    _type: "reference";
    _ref: string;
    _weak?: boolean;
  }>;
  slug: SanitySlug;
  isActive: boolean;
}

export interface SanityCategoryWithChildren
  extends Omit<SanityCategory, "children"> {
  children?: SanityCategory[];
}

export interface CategoryPath {
  slug: string;
  title: string;
}

export interface SanityCategoryWithPath extends SanityCategoryWithChildren {
  path?: CategoryPath[];
}

export interface SanityHeaderLink {
  _type: "headerLink";
  label: string;
  href: string;
  children?: SanityHeaderLink[];
}

export interface SanityHeaderConfig {
  _id: string;
  _type: "headerConfig";
  logo: {
    image: SanityImage;
    alt: string;
    href: string;
  };
  mainNavigation: SanityHeaderLink[];
  secondaryNavigation?: SanityHeaderLink[];
  ctaButton?: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
  };
  languages: {
    code: string;
    name: string;
    isDefault?: boolean;
  }[];
}
