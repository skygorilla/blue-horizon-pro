export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      booking_weeks: {
        Row: {
          agent: string | null
          booking_id: number | null
          created_at: string | null
          direction: string | null
          id: string
          meal_plan: string | null
          status: string
          updated_at: string | null
          week_number: string
        }
        Insert: {
          agent?: string | null
          booking_id?: number | null
          created_at?: string | null
          direction?: string | null
          id?: string
          meal_plan?: string | null
          status?: string
          updated_at?: string | null
          week_number: string
        }
        Update: {
          agent?: string | null
          booking_id?: number | null
          created_at?: string | null
          direction?: string | null
          id?: string
          meal_plan?: string | null
          status?: string
          updated_at?: string | null
          week_number?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      country_price_index: {
        Row: {
          country_iso: string
          groceries_index: number | null
          updated_at: string | null
        }
        Insert: {
          country_iso: string
          groceries_index?: number | null
          updated_at?: string | null
        }
        Update: {
          country_iso?: string
          groceries_index?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      guest_types: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          meal_pattern: string[] | null
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          meal_pattern?: string[] | null
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          meal_pattern?: string[] | null
          name?: string
        }
        Relationships: []
      }
      ingredient_prices: {
        Row: {
          country_iso: string
          currency: string | null
          ingredient_id: number
          observed_at: string | null
          price_per_kg: number | null
        }
        Insert: {
          country_iso: string
          currency?: string | null
          ingredient_id: number
          observed_at?: string | null
          price_per_kg?: number | null
        }
        Update: {
          country_iso?: string
          currency?: string | null
          ingredient_id?: number
          observed_at?: string | null
          price_per_kg?: number | null
        }
        Relationships: []
      }
      inventory: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          last_updated: string | null
          name: string
          quantity_in_stock: number
          supplier_id: string | null
          unit: string
          unit_price: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          name: string
          quantity_in_stock?: number
          supplier_id?: string | null
          unit: string
          unit_price?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          name?: string
          quantity_in_stock?: number
          supplier_id?: string | null
          unit?: string
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_guests: {
        Row: {
          count: number
          created_at: string | null
          guest_type_id: string | null
          id: string
          menu_id: string | null
        }
        Insert: {
          count?: number
          created_at?: string | null
          guest_type_id?: string | null
          id?: string
          menu_id?: string | null
        }
        Update: {
          count?: number
          created_at?: string | null
          guest_type_id?: string | null
          id?: string
          menu_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_guests_guest_type_id_fkey"
            columns: ["guest_type_id"]
            isOneToOne: false
            referencedRelation: "guest_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_guests_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_recipes: {
        Row: {
          created_at: string | null
          day_of_week: number
          id: string
          meal_type: string
          menu_id: string | null
          recipe_id: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          id?: string
          meal_type: string
          menu_id?: string | null
          recipe_id?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          id?: string
          meal_type?: string
          menu_id?: string | null
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_recipes_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_recipes_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          name: string
          start_date: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          name: string
          start_date: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          name?: string
          start_date?: string
        }
        Relationships: []
      }
      prepared_items: {
        Row: {
          expires_at: string
          id: string
          location: string | null
          name: string | null
          owner: string | null
          prepared_at: string
          shelf_life_h: number
        }
        Insert: {
          expires_at?: string
          id?: string
          location?: string | null
          name?: string | null
          owner?: string | null
          prepared_at?: string
          shelf_life_h: number
        }
        Update: {
          expires_at?: string
          id?: string
          location?: string | null
          name?: string | null
          owner?: string | null
          prepared_at?: string
          shelf_life_h?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          available_roles: string[] | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          available_roles?: string[] | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          available_roles?: string[] | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recipe_items: {
        Row: {
          created_at: string | null
          id: string
          inventory_id: string | null
          quantity: number
          recipe_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          inventory_id?: string | null
          quantity: number
          recipe_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          inventory_id?: string | null
          quantity?: number
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_items_inventory_id_fkey"
            columns: ["inventory_id"]
            isOneToOne: false
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_items_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          cook_time: number | null
          cost_per_serving_usd: number | null
          created_at: string | null
          guest_type: string
          id: string
          ingredient_list: Json | null
          ingredients: string
          instructions: string | null
          last_used: string | null
          meal_type: string
          prep_time: number | null
          servings: number | null
          title: string
        }
        Insert: {
          cook_time?: number | null
          cost_per_serving_usd?: number | null
          created_at?: string | null
          guest_type?: string
          id?: string
          ingredient_list?: Json | null
          ingredients: string
          instructions?: string | null
          last_used?: string | null
          meal_type: string
          prep_time?: number | null
          servings?: number | null
          title: string
        }
        Update: {
          cook_time?: number | null
          cost_per_serving_usd?: number | null
          created_at?: string | null
          guest_type?: string
          id?: string
          ingredient_list?: Json | null
          ingredients?: string
          instructions?: string | null
          last_used?: string | null
          meal_type?: string
          prep_time?: number | null
          servings?: number | null
          title?: string
        }
        Relationships: []
      }
      shopping_list: {
        Row: {
          amount: string
          category: string | null
          checked: boolean | null
          created_at: string | null
          id: string
          inventory_id: string | null
          menu_id: string | null
          name: string
          supplier_id: string | null
          unit_price: number | null
        }
        Insert: {
          amount: string
          category?: string | null
          checked?: boolean | null
          created_at?: string | null
          id?: string
          inventory_id?: string | null
          menu_id?: string | null
          name: string
          supplier_id?: string | null
          unit_price?: number | null
        }
        Update: {
          amount?: string
          category?: string | null
          checked?: boolean | null
          created_at?: string | null
          id?: string
          inventory_id?: string | null
          menu_id?: string | null
          name?: string
          supplier_id?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_inventory_id_fkey"
            columns: ["inventory_id"]
            isOneToOne: false
            referencedRelation: "inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_list_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_list_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          contact_info: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          contact_info?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          contact_info?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      populate_booking_weeks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      recipe_in_stock: {
        Args: { recipe_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
