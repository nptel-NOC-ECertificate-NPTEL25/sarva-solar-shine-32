import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Public (anon-readable) content hooks.
 * Every one of these reads from Lovable Cloud (Supabase) — the source of truth.
 * RLS restricts anon reads to published / active rows only.
 */

const STALE = 5 * 60 * 1000;

export type SiteSettings = Record<string, unknown> & {
  brand?: {
    name?: string;
    short_name?: string;
    tagline?: string;
    logo_url?: string;
  };
  contact?: {
    phone?: string;
    phone_raw?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
    city?: string;
    map_embed?: string;
  };
  social?: Record<string, string>;
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    staleTime: STALE,
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      const out: Record<string, unknown> = {};
      (data ?? []).forEach((row) => {
        out[row.key] = row.value;
      });
      return out as SiteSettings;
    },
  });
}

export function useNavigation(location: "header" | "footer" = "header") {
  return useQuery({
    queryKey: ["navigation_items", location],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("navigation_items")
        .select("id,label,href,sort_order,parent_id")
        .eq("location", location)
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useHeroSlides(pageSlug = "home") {
  return useQuery({
    queryKey: ["hero_slides", pageSlug],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .eq("page_slug", pageSlug)
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("statistics")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("status", "published")
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useProjects(category?: string) {
  return useQuery({
    queryKey: ["projects", category ?? "all"],
    staleTime: STALE,
    queryFn: async () => {
      let q = supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("sort_order");
      if (category && category !== "All") q = q.eq("category", category);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "published")
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useFaqs(category?: string) {
  return useQuery({
    queryKey: ["faqs", category ?? "all"],
    staleTime: STALE,
    queryFn: async () => {
      let q = supabase
        .from("faqs")
        .select("*")
        .eq("status", "published")
        .order("sort_order");
      if (category) q = q.eq("category", category);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function usePageSections(pageSlug: string) {
  return useQuery({
    queryKey: ["page_sections", pageSlug],
    staleTime: STALE,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page_slug", pageSlug)
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      const map: Record<string, (typeof data)[number]> = {};
      (data ?? []).forEach((s) => {
        map[s.section_key] = s;
      });
      return map;
    },
  });
}

export function useCalculatorConfig() {
  return useQuery({
    queryKey: ["calculator_config"],
    staleTime: STALE,
    queryFn: async () => {
      const [settings, slabs, schemes] = await Promise.all([
        supabase.from("calculator_settings").select("*").eq("is_active", true).limit(1).maybeSingle(),
        supabase.from("calculator_cost_slabs").select("*").eq("is_active", true).order("min_kw"),
        supabase
          .from("subsidy_schemes")
          .select("*, subsidy_slabs(*)")
          .eq("status", "published"),
      ]);
      if (settings.error) throw settings.error;
      if (slabs.error) throw slabs.error;
      if (schemes.error) throw schemes.error;
      return {
        settings: settings.data,
        slabs: slabs.data ?? [],
        schemes: schemes.data ?? [],
      };
    },
  });
}
