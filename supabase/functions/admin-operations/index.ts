
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create admin client with service role key (bypasses RLS)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { operation, table, data, filters } = await req.json();

    console.log('Admin operation requested:', { operation, table, filters });

    let result;

    switch (operation) {
      case 'select':
        if (filters) {
          let query = supabaseAdmin.from(table).select('*');
          
          // Apply filters
          Object.entries(filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
          
          result = await query;
        } else {
          result = await supabaseAdmin.from(table).select('*');
        }
        break;

      case 'insert':
        result = await supabaseAdmin.from(table).insert(data);
        break;

      case 'update':
        if (!filters) {
          throw new Error('Update operation requires filters');
        }
        let updateQuery = supabaseAdmin.from(table).update(data);
        
        Object.entries(filters).forEach(([key, value]) => {
          updateQuery = updateQuery.eq(key, value);
        });
        
        result = await updateQuery;
        break;

      case 'delete':
        if (!filters) {
          throw new Error('Delete operation requires filters');
        }
        let deleteQuery = supabaseAdmin.from(table).delete();
        
        Object.entries(filters).forEach(([key, value]) => {
          deleteQuery = deleteQuery.eq(key, value);
        });
        
        result = await deleteQuery;
        break;

      case 'truncate':
        // WARNING: This will delete all data in the table
        result = await supabaseAdmin.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
        break;

      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }

    if (result.error) {
      console.error('Database operation error:', result.error);
      throw result.error;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: result.data,
        operation,
        table 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );

  } catch (error) {
    console.error('Admin operation error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
})
