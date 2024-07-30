import { useState, useMemo, useCallback, useEffect } from "react";
import vocabularyData, {
  VocabularyItem,
  VerbConjugations,
} from "./data/vocabularyData";
import { Volume2 } from "lucide-react";
import { ElevenLabsClient } from "elevenlabs";
const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY || "";

const pronouns: Record<string, string> = {
  I: "أنا",
  he: "هو",
  she: "هي",
  "they (m)": "هم",
  "they (f)": "هنّ",
  we: "نحن",
  "you (m)": "أنتَ",
  "you (f)": "أنتِ",
};

interface ConjugationTableProps {
  conjugations: VerbConjugations;
  tense: "present" | "past";
}

const ConjugationTable: React.FC<ConjugationTableProps> = ({
  conjugations,
  tense,
}) => (
  <table className="w-full text-sm">
    <tbody>
      {Object.entries(conjugations[tense]).map(([person, conj], index) => (
        <tr
          key={person}
          className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
            index % 2 === 0
              ? "bg-blue-50 dark:bg-blue-900"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          <td className="py-2 pr-2 font-medium text-gray-700 dark:text-gray-300">
            {person}{" "}
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              ({pronouns[person]})
            </span>
          </td>
          <td className="py-2 text-xl font-bold text-blue-600 dark:text-blue-400">
            {conj}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

interface VocabularyCardProps {
  item: VocabularyItem;
  onStarToggle: (id: number) => void;
  isStarred: boolean;
  audioCache: Record<string, string>;
  setAudioCache: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  elevenLabsClient: ElevenLabsClient;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  item,
  onStarToggle,
  isStarred,
  audioCache,
  setAudioCache,
  elevenLabsClient,
}) => {
  const [activeTab, setActiveTab] = useState<"present" | "past">("present");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleReportIssue = useCallback(() => {
    const subject = encodeURIComponent(`Issue Report: ${item.arabic}`);
    const body = encodeURIComponent(
      `I'd like to report an issue with the following vocabulary item:\n\nArabic: ${
        item.arabic
      }\nEnglish: ${item.english.join(", ")}\n\nPlease describe the issue:`
    );
    window.location.href = `mailto:fadbz08@gmail.com?subject=${subject}&body=${body}`;
  }, [item]);

  const handlePlayAudio = useCallback(async () => {
    if (isPlaying) return;

    setIsPlaying(true);

    try {
      let audioSrc: string;

      if (audioCache[item.arabic]) {
        audioSrc = audioCache[item.arabic];
      } else {
        const response = await elevenLabsClient.generate({
          voice: "Charlotte",
          model_id: "eleven_multilingual_v2",
          text: item.arabic,
        });

        if (!(response instanceof ReadableStream)) {
          throw new Error("Expected a ReadableStream from ElevenLabs API");
        }

        const reader = response.getReader();
        const chunks: Uint8Array[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }

        const blob = new Blob(chunks, { type: "audio/mpeg" });
        audioSrc = URL.createObjectURL(blob);
        setAudioCache((prev) => ({ ...prev, [item.arabic]: audioSrc }));
      }

      const audio = new Audio(audioSrc);
      audio.onended = () => setIsPlaying(false);
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  }, [item.arabic, audioCache, elevenLabsClient, isPlaying, setAudioCache]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900 p-4">
        <h3 className="font-bold text-2xl text-blue-600 dark:text-blue-400">
          {item.arabic}
        </h3>
        <div className="flex items-center">
          <button
            onClick={handleReportIssue}
            className="mr-2 px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
          >
            Report Issue
          </button>
          <button
            onClick={() => onStarToggle(item.id)}
            className={`p-1 rounded-full ${
              isStarred
                ? "text-yellow-400 hover:text-yellow-500"
                : "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            }`}
          >
            ★
          </button>
          <button
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className={`ml-2 p-1 rounded-full ${
              isPlaying
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            }`}
          >
            <Volume2 />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-3">
          {item.english.map((translation, index) => (
            <span
              key={index}
              className="text-lg text-gray-700 dark:text-gray-300"
            >
              {translation}
              {index < item.english.length - 1 && (
                <span className="mx-1 text-gray-400 dark:text-gray-500">/</span>
              )}
            </span>
          ))}
        </div>
        {item.type === "verb" && item.conjugations && (
          <div>
            <div className="flex mb-2">
              <button
                onClick={() => setActiveTab("present")}
                className={`flex-1 py-2 ${
                  activeTab === "present"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Present
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`flex-1 py-2 ${
                  activeTab === "past"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Past
              </button>
            </div>
            <ConjugationTable
              conjugations={item.conjugations}
              tense={activeTab}
            />
          </div>
        )}
        {item.type === "noun" && item.forms && (
          <div className="space-y-3">
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Singular:
              </span>{" "}
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {item.forms.singular}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Plural:
              </span>{" "}
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {item.forms.plural}
              </span>
            </p>
          </div>
        )}
        {(item.type === "preposition" ||
          item.type === "adverb" ||
          item.type === "conjunction") && (
          <p className="text-gray-700 dark:text-gray-300">
            Type:{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400 capitalize">
              {item.type}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

const ArabicVocabularyDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory] = useState<string>("");
  const [starredItems, setStarredItems] = useState<number[]>([]);
  const [showStarredOnly, setShowStarredOnly] = useState<boolean>(false);
  const [audioCache, setAudioCache] = useState<Record<string, string>>({});

  useEffect(() => {
    alert("If this was beneficial, please make dua for me. -Fahad");
  }, []);

  const elevenLabsClient = useMemo(
    () => new ElevenLabsClient({ apiKey }),
    [apiKey]
  );

  const filteredVocabulary = useMemo(() => {
    return vocabularyData.filter(
      (item) =>
        (item.english.some((translation) =>
          translation.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
          item.arabic.includes(searchTerm)) &&
        (selectedCategory === "" ||
          item.categories.includes(selectedCategory)) &&
        (!showStarredOnly || starredItems.includes(item.id))
    );
  }, [searchTerm, selectedCategory, starredItems, showStarredOnly]);

  const handleStarToggle = (itemId: number) => {
    setStarredItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Arabic Vocabulary Dashboard
      </h1>
      <div className="flex flex-wrap gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search in English or Arabic"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
            🔍
          </span>
        </div>
        <button
          onClick={() => setShowStarredOnly(!showStarredOnly)}
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            showStarredOnly
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 border border-blue-500"
          }`}
        >
          ★ {showStarredOnly ? "Show All" : "Show Starred"}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVocabulary.map((item) => (
          <VocabularyCard
            key={item.id}
            item={item}
            onStarToggle={handleStarToggle}
            isStarred={starredItems.includes(item.id)}
            audioCache={audioCache}
            setAudioCache={setAudioCache}
            elevenLabsClient={elevenLabsClient}
          />
        ))}
      </div>
    </div>
  );
};

export default ArabicVocabularyDashboard;
