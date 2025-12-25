import Hero from '@/components/Hero';
import CtaSection from '@/components/CtaSection';
import AboutSnippet from '@/components/AboutSnippet';
import LatestProperties from '@/components/LatestProperties';
import connectDB from '@/lib/db';
import Property from '@/models/Property';

export const revalidate = false;
// About / Features Snippet
async function getLatestProperties() {
  try {
    await connectDB();

    // جلب البيانات مباشرة
    const properties = await Property.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(); // مهم جداً: يحول النتيجة إلى كائن جافاسكريبت عادي

    // تحويل البيانات لتكون قابلة للتمرير (Serialization)
    // Next.js يكره تمرير Date Objects أو _id Objects
    return properties.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt?.toString(),
      updatedAt: doc.updatedAt?.toString(),
      // تأكد أن السعر معالج إذا كان Mixed
      price: doc.price || 0
    }));

  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export default async function Home() {
  const properties = await getLatestProperties();

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <LatestProperties properties={properties} />
      <AboutSnippet />
      <CtaSection />
    </main>
  );
}