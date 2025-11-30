# Sanity Webhook Setup for Vercel Revalidation

To ensure your Vercel deployment updates when you make changes in Sanity CMS, you need to set up a webhook.

## Steps:

1. **Get your revalidation secret:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add a new variable: `SANITY_REVALIDATE_SECRET` with a random secret string (e.g., generate one at https://generate-secret.vercel.app/32)
   - Redeploy your application after adding the variable

2. **Set up the webhook in Sanity:**
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to "API" → "Webhooks"
   - Click "Create webhook"
   - Set the following:
     - **Name**: Vercel Revalidation
     - **URL**: `https://your-domain.vercel.app/api/revalidate`
     - **Dataset**: Your dataset name
     - **Trigger on**: Check "Create", "Update", and "Delete"
     - **Filter**: Leave empty (or add specific document types if needed)
     - **Secret**: Use the same secret you set in Vercel (`SANITY_REVALIDATE_SECRET`)
     - **HTTP method**: POST
     - **API version**: Use your current API version

3. **Test the webhook:**
   - Make a change in Sanity CMS
   - The webhook should trigger and revalidate your pages
   - Check Vercel logs to see if the revalidation was successful

## Alternative: Manual Revalidation

If webhooks don't work, you can manually trigger revalidation by visiting:
- `https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET`

## Note:

Since you're using client-side fetching (`"use client"`), the webhook will trigger page revalidation, but users may need to refresh their browser to see changes. For instant updates, consider:
- Converting to server components with ISR
- Using Sanity's real-time preview
- Adding a refresh mechanism in your client components

