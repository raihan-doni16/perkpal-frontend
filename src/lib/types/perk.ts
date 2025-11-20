export interface CategoryRef { id: number; name: string; slug: string }
export interface SubcategoryRef { id: number; name: string; slug: string }

export type RedeemType = 'external_link' | 'coupon_code' | 'lead_form';
export type Location = string;

export interface PerkListItem {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  partner_name: string;
  partner_logo?: string;
  redeem_type: RedeemType;
  location: Location;
  location_label?: string;
  valid_from?: string;
  valid_until?: string;
  is_featured?: boolean;
  category?: CategoryRef;
  subcategory?: SubcategoryRef;
  media?: { banner?: string };
  view_count?: number;
  claim_count?: number;
  published_at?: string;
}

export interface PerkDetail extends PerkListItem {
  description?: string;
  partner_url?: string;
  coupon_code?: string;
  media?: {
    logo?: string;
    banner?: string;
    gallery?: string[];
  };
  meta?: {
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    og_image?: string;
  };
  schema_json?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}
