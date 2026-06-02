export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BonusItem {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  tag: string;
}

export interface UseCaseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PostMockupItem {
  id: string;
  category: string;
  title: string;
  highlightText?: string;
  imageAlt: string;
  tag: string;
  bulletPoints?: string[];
}
