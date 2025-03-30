// File: pages/index.js

"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import CardEditor from "./components/CardEditor";
import CardGallery from "./components/CardGallery";
import CardPreview from "./components/CardPreview";
import Navbar from "./components/Navbar";
import { captureCardAsImage } from "./utils/html2canvas";
import { useRouter } from "next/navigation";
import Link from "next/link";
import getSupabase from "./utils/supabase";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY8nGUl0rktcbieqpTt1_6em7lYfuDXco",
  authDomain: "eid-card-creator.firebaseapp.com",
  projectId: "eid-card-creator",
  storageBucket: "eid-card-creator.firebasestorage.app",
  messagingSenderId: "711332634305",
  appId: "1:711332634305:web:aeb549a615576d09bdfe40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Supabase configuration
const supabase = getSupabase();

// Card templates
const templates = [
  {
    id: "template1",
    name: "Classic Eid Mubarak",
    imageUrl: "/templates/template1.jpg",
    defaultText: "Eid Mubarak!",
    textColor: "#ffffff",
    backgroundColor: "#4CAF50",
    fontFamily: "Arial",
  },
  {
    id: "template2",
    name: "Modern Crescent",
    imageUrl: "/templates/template2.jpg",
    defaultText: "Wishing you a blessed Eid",
    textColor: "#212121",
    backgroundColor: "#FFC107",
    fontFamily: "Roboto",
  },
  {
    id: "template3",
    name: "Geometric Pattern",
    imageUrl: "/templates/template3.jpg",
    defaultText: "May this Eid bring joy and happiness",
    textColor: "#ffffff",
    backgroundColor: "#2196F3",
    fontFamily: "Montserrat",
  },
  {
    id: "template4",
    name: "Traditional Lanterns",
    imageUrl: "/templates/template4.jpg",
    defaultText: "Eid Mubarak to you and your family",
    textColor: "#ffffff",
    backgroundColor: "#9C27B0",
    fontFamily: "Cairo",
  },
  {
    id: "template5",
    name: "Elegant Mosque",
    imageUrl: "/templates/template5.jpg",
    defaultText: "Happy Eid al-Fitr",
    textColor: "#212121",
    backgroundColor: "#E0E0E0",
    fontFamily: "Lato",
  },
  {
    id: "template6",
    name: "Festive Ornaments",
    imageUrl: "/templates/template6.jpg",
    defaultText: "Eid Greetings!",
    textColor: "#ffffff",
    backgroundColor: "#FF5722",
    fontFamily: "Poppins",
  },
  {
    id: "template7",
    name: "Minimalist Moon",
    imageUrl: "/templates/template7.jpg",
    defaultText: "Eid Mubarak",
    textColor: "#212121",
    backgroundColor: "#FFEB3B",
    fontFamily: "Open Sans",
  },
  {
    id: "template8",
    name: "Floral Pattern",
    imageUrl: "/templates/template8.jpg",
    defaultText: "Blessed Eid",
    textColor: "#ffffff",
    backgroundColor: "#673AB7",
    fontFamily: "Quicksand",
  },
  {
    id: "template9",
    name: "Starry Night",
    imageUrl: "/templates/template9.jpg",
    defaultText: "Joyous Eid Wishes",
    textColor: "#ffffff",
    backgroundColor: "#3F51B5",
    fontFamily: "Raleway",
  },
  {
    id: "template10",
    name: "Golden Celebration",
    imageUrl: "/templates/template10.jpg",
    defaultText: "May your Eid be filled with blessings",
    textColor: "#212121",
    backgroundColor: "#FFD700",
    fontFamily: "Playfair Display",
  },
];

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [customizedCard, setCustomizedCard] = useState(null);
  const [sharedCards, setSharedCards] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardURL, setCardURL] = useState(null);
  const router = useRouter();

  // Initialize anonymous session
  useEffect(() => {
    const initSession = async () => {
      // Check if user is already signed in
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setUserId(session.user.id);
      } else {
        // Sign in anonymously
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error("Auth error:", error);
        } else if (data?.user) {
          setUserId(data.user.id);
        }
      }
    };

    initSession();
    fetchSharedCards();
  }, []);

  // Fetch shared cards from Supabase
  const fetchSharedCards = async () => {
    try {
      const { data, error } = await supabase
        .from("shared_cards")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSharedCards(data || []);
    } catch (error) {
      console.error("Error fetching shared cards:", error);
    }
  };

  // Select a template and enter edit mode
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setCustomizedCard({
      templateId: template.id,
      title: template.defaultText,
      greeting: "Hi Ali,",
      message:
        "I miss you so much and I wish we could be together the next Eid.",
      signature: "Best wishes,\nYour Name",
      titleStyle: {
        text: template.defaultText,
        fontFamily: template.fontFamily,
        fontSize: "2rem",
        color: template.textColor,
      },
      greetingStyle: {
        fontFamily: template.fontFamily,
        fontSize: "1.5rem",
        color: template.textColor,
      },
      messageStyle: {
        fontFamily: template.fontFamily,
        fontSize: "1rem",
        color: template.textColor,
      },
      signatureStyle: {
        fontFamily: template.fontFamily,
        fontSize: "1.25rem",
        color: template.textColor,
      },
      backgroundColor: template.backgroundColor,
      imageUrl: template.imageUrl,
    });
    setEditMode(true);
  };

  // Update customized card properties
  const handleUpdateCard = (updates) => {
    setCustomizedCard((prev) => ({ ...prev, ...updates }));
  };

  // Share card to Supabase

  const handleShareCard = async () => {
    if (!customizedCard || !userId) return;

    setLoading(true);

    try {
      // Capture card as image
      const dataUrl = await captureCardAsImage("card-preview");
      if (!dataUrl) throw new Error("Failed to capture card image");

      // Convert data URL to File object
      const base64Data = dataUrl.split(",")[1];
      const blob = await (
        await fetch(`data:image/png;base64,${base64Data}`)
      ).blob();
      const file = new File([blob], `eid-card-${Date.now()}.png`, {
        type: "image/png",
      });

      // Upload image to Supabase Storage
      const filePath = `${userId}/${Date.now()}.png`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("eid-cards")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage.from("eid-cards").getPublicUrl(filePath);

      // Save card data to Supabase database
      const { error: insertError } = await supabase
        .from("shared_cards")
        .insert({
          user_id: userId,
          template_id: customizedCard.templateId,
          title: customizedCard.titleStyle.text,
          greeting: customizedCard.greeting,
          message: customizedCard.message,
          signature: customizedCard.signature,
          styles: {
            title: customizedCard.titleStyle,
            greeting: customizedCard.greetingStyle,
            message: customizedCard.messageStyle,
            signature: customizedCard.signatureStyle,
            backgroundColor: customizedCard.backgroundColor,
          },
          preview_url: publicUrl,
        });

      if (insertError) throw insertError;

      alert("Card shared successfully!");

      const data = await supabase
        .from("shared_cards")
        .select("*")
        .eq("preview_url", publicUrl);
      fetchSharedCards();
      router.push(`/view-card/${data?.data[0]?.id}`);
    } catch (error) {
      console.error("Error sharing card:", error);
      alert("Failed to share card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Eid Card Creator</title>
        <meta
          name="description"
          content="Create and share customizable Eid cards"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {!editMode ? (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-emerald-700 mb-2">
                Eid Card Creator
              </h1>
              <p className="text-gray-600 text-lg">
                Create beautiful Eid cards to share with your loved ones
              </p>
            </div>

            <CardGallery
              templates={templates}
              onSelectTemplate={handleSelectTemplate}
            />

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Community Shared Cards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedCards.map((card) => (
                  <Link href={`/view-card/${card.id}`} key={card.id}>
                    <div
                      key={card.id}
                      className="border rounded-lg overflow-hidden shadow-md bg-white"
                    >
                      <img
                        src={card.preview_url}
                        alt="Shared Eid Card"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <p className="text-sm text-gray-500">
                          Shared on{" "}
                          {new Date(card.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
                {sharedCards.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    No cards have been shared yet. Be the first to share your
                    creation!
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CardEditor
                card={customizedCard}
                onUpdateCard={handleUpdateCard}
              />
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Back to Gallery
                </button>
                <button
                  onClick={handleShareCard}
                  disabled={loading}
                  className={`px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Sharing..." : "Share Card"}
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Preview</h3>
              <CardPreview card={customizedCard} />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Eid Card Creator. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
