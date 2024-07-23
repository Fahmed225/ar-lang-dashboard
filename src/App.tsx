import React, { useState, useMemo } from "react";

const vocabularyData = [
  {
    id: 1,
    arabic: "أبحَث عن",
    english: ["to look for", "to search"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أبحث",
        he: "يبحث",
        she: "تبحث",
        "they (m)": "يبحثون",
        "they (f)": "يبحثن",
        we: "نبحث",
        "you (m)": "تبحث",
        "you (f)": "تبحثين",
      },
      past: {
        I: "بحثت",
        he: "بحث",
        she: "بحثت",
        "they (m)": "بحثوا",
        "they (f)": "بحثن",
        we: "بحثنا",
        "you (m)": "بحثت",
        "you (f)": "بحثتِ",
      },
    },
  },
  {
    id: 2,
    arabic: "كتاب",
    english: ["book", "volume"],
    categories: ["Nouns", "Education"],
    type: "noun",
    forms: {
      singular: "كتاب",
      plural: "كتب",
    },
  },
  {
    id: 3,
    arabic: "أَتَعَرَّف على",
    english: ["to get acquainted with", "to meet"],
    categories: ["Verbs", "Social"],
    type: "verb",
    conjugations: {
      present: {
        I: "أتعرف",
        he: "يتعرف",
        she: "تتعرف",
        "they (m)": "يتعرفون",
        "they (f)": "يتعرفن",
        we: "نتعرف",
        "you (m)": "تتعرف",
        "you (f)": "تتعرفين",
      },
      past: {
        I: "تعرفت",
        he: "تعرف",
        she: "تعرفت",
        "they (m)": "تعرفوا",
        "they (f)": "تعرفن",
        we: "تعرفنا",
        "you (m)": "تعرفت",
        "you (f)": "تعرفتِ",
      },
    },
  },
  {
    id: 4,
    arabic: "أتَعَلَّم",
    english: ["to learn"],
    categories: ["Verbs", "Education"],
    type: "verb",
    conjugations: {
      present: {
        I: "أتعلم",
        he: "يتعلم",
        she: "تتعلم",
        "they (m)": "يتعلمون",
        "they (f)": "يتعلمن",
        we: "نتعلم",
        "you (m)": "تتعلم",
        "you (f)": "تتعلمين",
      },
      past: {
        I: "تعلمت",
        he: "تعلم",
        she: "تعلمت",
        "they (m)": "تعلموا",
        "they (f)": "تعلمن",
        we: "تعلمنا",
        "you (m)": "تعلمت",
        "you (f)": "تعلمتِ",
      },
    },
  },
  {
    id: 5,
    arabic: "أتكَلَّم",
    english: ["to talk", "to speak"],
    categories: ["Verbs", "Communication"],
    type: "verb",
    conjugations: {
      present: {
        I: "أتكلم",
        he: "يتكلم",
        she: "تتكلم",
        "they (m)": "يتكلمون",
        "they (f)": "يتكلمن",
        we: "نتكلم",
        "you (m)": "تتكلم",
        "you (f)": "تتكلمين",
      },
      past: {
        I: "تكلمت",
        he: "تكلم",
        she: "تكلمت",
        "they (m)": "تكلموا",
        "they (f)": "تكلمن",
        we: "تكلمنا",
        "you (m)": "تكلمت",
        "you (f)": "تكلمتِ",
      },
    },
  },
  {
    id: 6,
    arabic: "أثناء",
    english: ["during"],
    categories: ["Prepositions", "Time"],
    type: "preposition",
  },
  {
    id: 7,
    arabic: "أحتاج إلى",
    english: ["I need", "to need"],
    categories: ["Verbs", "Necessity"],
    type: "verb",
    conjugations: {
      present: {
        I: "أحتاج",
        he: "يحتاج",
        she: "تحتاج",
        "they (m)": "يحتاجون",
        "they (f)": "يحتجن",
        we: "نحتاج",
        "you (m)": "تحتاج",
        "you (f)": "تحتاجين",
      },
      past: {
        I: "احتجت",
        he: "احتاج",
        she: "احتاجت",
        "they (m)": "احتاجوا",
        "they (f)": "احتجن",
        we: "احتجنا",
        "you (m)": "احتجت",
        "you (f)": "احتجتِ",
      },
    },
  },
  {
    id: 8,
    arabic: "أَخْبَر يُخْبِر الإخْبار",
    english: ["to tell", "to inform"],
    categories: ["Verbs", "Communication"],
    type: "verb",
    conjugations: {
      present: {
        I: "أخبر",
        he: "يخبر",
        she: "تخبر",
        "they (m)": "يخبرون",
        "they (f)": "يخبرن",
        we: "نخبر",
        "you (m)": "تخبر",
        "you (f)": "تخبرين",
      },
      past: {
        I: "أخبرت",
        he: "أخبر",
        she: "أخبرت",
        "they (m)": "أخبروا",
        "they (f)": "أخبرن",
        we: "أخبرنا",
        "you (m)": "أخبرت",
        "you (f)": "أخبرتِ",
      },
    },
  },
  {
    id: 9,
    arabic: "أدرُس",
    english: ["to study"],
    categories: ["Verbs", "Education"],
    type: "verb",
    conjugations: {
      present: {
        I: "أدرس",
        he: "يدرس",
        she: "تدرس",
        "they (m)": "يدرسون",
        "they (f)": "يدرسن",
        we: "ندرس",
        "you (m)": "تدرس",
        "you (f)": "تدرسين",
      },
      past: {
        I: "درست",
        he: "درس",
        she: "درست",
        "they (m)": "درسوا",
        "they (f)": "درسن",
        we: "درسنا",
        "you (m)": "درست",
        "you (f)": "درستِ",
      },
    },
  },
  {
    id: 10,
    arabic: "أرزّ",
    english: ["rice"],
    categories: ["Nouns", "Food"],
    type: "noun",
  },
  {
    id: 11,
    arabic: "أُريدُ أن",
    english: ["want to"],
    categories: ["Verbs", "Desire"],
    type: "verb",
    conjugations: {
      present: {
        I: "أريد",
        he: "يريد",
        she: "تريد",
        "they (m)": "يريدون",
        "they (f)": "يردن",
        we: "نريد",
        "you (m)": "تريد",
        "you (f)": "تريدين",
      },
      past: {
        I: "أردت",
        he: "أراد",
        she: "أرادت",
        "they (m)": "أرادوا",
        "they (f)": "أردن",
        we: "أردنا",
        "you (m)": "أردت",
        "you (f)": "أردتِ",
      },
    },
  },
  {
    id: 12,
    arabic: "أسافِر",
    english: ["to travel"],
    categories: ["Verbs", "Travel"],
    type: "verb",
    conjugations: {
      present: {
        I: "أسافر",
        he: "يسافر",
        she: "تسافر",
        "they (m)": "يسافرون",
        "they (f)": "يسافرن",
        we: "نسافر",
        "you (m)": "تسافر",
        "you (f)": "تسافرين",
      },
      past: {
        I: "سافرت",
        he: "سافر",
        she: "سافرت",
        "they (m)": "سافروا",
        "they (f)": "سافرن",
        we: "سافرنا",
        "you (m)": "سافرت",
        "you (f)": "سافرتِ",
      },
    },
  },
  {
    id: 13,
    arabic: "أسكُن",
    english: ["to live", "to reside"],
    categories: ["Verbs", "Residence"],
    type: "verb",
    conjugations: {
      present: {
        I: "أسكن",
        he: "يسكن",
        she: "تسكن",
        "they (m)": "يسكنون",
        "they (f)": "يسكنن",
        we: "نسكن",
        "you (m)": "تسكن",
        "you (f)": "تسكنين",
      },
      past: {
        I: "سكنت",
        he: "سكن",
        she: "سكنت",
        "they (m)": "سكنوا",
        "they (f)": "سكنن",
        we: "سكننا",
        "you (m)": "سكنت",
        "you (f)": "سكنتِ",
      },
    },
  },
  {
    id: 14,
    arabic: "أَصدِقاء",
    english: ["friends"],
    categories: ["Nouns", "Social"],
    type: "noun",
    forms: {
      singular: "صديق",
      plural: "أصدقاء",
    },
  },
  {
    id: 15,
    arabic: "أضاف يضيف الإضافة",
    english: ["to add"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أضيف",
        he: "يضيف",
        she: "تضيف",
        "they (m)": "يضيفون",
        "they (f)": "يضيفن",
        we: "نضيف",
        "you (m)": "تضيف",
        "you (f)": "تضيفين",
      },
      past: {
        I: "أضفت",
        he: "أضاف",
        she: "أضافت",
        "they (m)": "أضافوا",
        "they (f)": "أضفن",
        we: "أضفنا",
        "you (m)": "أضفت",
        "you (f)": "أضفتِ",
      },
    },
  },
  {
    id: 16,
    arabic: "أعرِف",
    english: ["to know"],
    categories: ["Verbs", "Knowledge"],
    type: "verb",
    conjugations: {
      present: {
        I: "أعرف",
        he: "يعرف",
        she: "تعرف",
        "they (m)": "يعرفون",
        "they (f)": "يعرفن",
        we: "نعرف",
        "you (m)": "تعرف",
        "you (f)": "تعرفين",
      },
      past: {
        I: "عرفت",
        he: "عرف",
        she: "عرفت",
        "they (m)": "عرفوا",
        "they (f)": "عرفن",
        we: "عرفنا",
        "you (m)": "عرفت",
        "you (f)": "عرفتِ",
      },
    },
  },
  {
    id: 17,
    arabic: "أعطى يعطي الإعطاء",
    english: ["to give"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أعطي",
        he: "يعطي",
        she: "تعطي",
        "they (m)": "يعطون",
        "they (f)": "يعطين",
        we: "نعطي",
        "you (m)": "تعطي",
        "you (f)": "تعطين",
      },
      past: {
        I: "أعطيت",
        he: "أعطى",
        she: "أعطت",
        "they (m)": "أعطوا",
        "they (f)": "أعطين",
        we: "أعطينا",
        "you (m)": "أعطيت",
        "you (f)": "أعطيتِ",
      },
    },
  },
  {
    id: 18,
    arabic: "قدّم يقدّم التقديم",
    english: ["to serve", "to present"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أقدم",
        he: "يقدم",
        she: "تقدم",
        "they (m)": "يقدمون",
        "they (f)": "يقدمن",
        we: "نقدم",
        "you (m)": "تقدم",
        "you (f)": "تقدمين",
      },
      past: {
        I: "قدمت",
        he: "قدم",
        she: "قدمت",
        "they (m)": "قدموا",
        "they (f)": "قدمن",
        we: "قدمنا",
        "you (m)": "قدمت",
        "you (f)": "قدمتِ",
      },
    },
  },
  {
    id: 19,
    arabic: "أُفَكِّر",
    english: ["to think"],
    categories: ["Verbs", "Mental"],
    type: "verb",
    conjugations: {
      present: {
        I: "أفكر",
        he: "يفكر",
        she: "تفكر",
        "they (m)": "يفكرون",
        "they (f)": "يفكرن",
        we: "نفكر",
        "you (m)": "تفكر",
        "you (f)": "تفكرين",
      },
      past: {
        I: "فكرت",
        he: "فكر",
        she: "فكرت",
        "they (m)": "فكروا",
        "they (f)": "فكرن",
        we: "فكرنا",
        "you (m)": "فكرت",
        "you (f)": "فكرتِ",
      },
    },
  },
  {
    id: 20,
    arabic: "أمامَ",
    english: ["in front of"],
    categories: ["Prepositions", "Location"],
    type: "preposition",
  },
  {
    id: 21,
    arabic: "أوّلاً",
    english: ["first"],
    categories: ["Adverbs", "Time"],
    type: "adverb",
  },
  {
    id: 22,
    arabic: "أيضاً",
    english: ["too", "as well"],
    categories: ["Adverbs", "Addition"],
    type: "adverb",
  },
  {
    id: 23,
    arabic: "إذن",
    english: ["so", "then"],
    categories: ["Conjunctions", "Transition"],
    type: "conjunction",
  },
  {
    id: 24,
    arabic: "إِشارة ضَوئِيّة",
    english: ["traffic light"],
    categories: ["Nouns", "Transportation"],
    type: "noun",
    forms: {
      singular: "إشارة ضوئية",
      plural: "إشارات ضوئية",
    },
  },
  {
    id: 25,
    arabic: "اِتَّجَهَ، يَتَّجِهُ، الاتِّجاه",
    english: ["to go towards", "to head towards"],
    categories: ["Verbs", "Movement"],
    type: "verb",
    conjugations: {
      present: {
        I: "أتجه",
        he: "يتجه",
        she: "تتجه",
        "they (m)": "يتجهون",
        "they (f)": "يتجهن",
        we: "نتجه",
        "you (m)": "تتجه",
        "you (f)": "تتجهين",
      },
      past: {
        I: "اتجهت",
        he: "اتجه",
        she: "اتجهت",
        "they (m)": "اتجهوا",
        "they (f)": "اتجهن",
        we: "اتجهنا",
        "you (m)": "اتجهت",
        "you (f)": "اتجهتِ",
      },
    },
  },
  {
    id: 26,
    arabic: "اِتَّصَل يَتَّصِل الاتِّصال (بِـ)",
    english: ["to call", "to contact"],
    categories: ["Verbs", "Communication"],
    type: "verb",
    conjugations: {
      present: {
        I: "أتصل",
        he: "يتصل",
        she: "تتصل",
        "they (m)": "يتصلون",
        "they (f)": "يتصلن",
        we: "نتصل",
        "you (m)": "تتصل",
        "you (f)": "تتصلين",
      },
      past: {
        I: "اتصلت",
        he: "اتصل",
        she: "اتصلت",
        "they (m)": "اتصلوا",
        "they (f)": "اتصلن",
        we: "اتصلنا",
        "you (m)": "اتصلت",
        "you (f)": "اتصلتِ",
      },
    },
  },
  {
    id: 27,
    arabic: "ازدحم يزدحم الازدحام",
    english: ["traffic jam", "crowdedness"],
    categories: ["Nouns", "Transportation"],
    type: "noun",
    forms: {
      singular: "ازدحام",
      plural: "ازدحامات",
    },
  },
  {
    id: 28,
    arabic: "استحمّ يستحمّ الاستحمام",
    english: ["to bathe", "to take a bath"],
    categories: ["Verbs", "Hygiene"],
    type: "verb",
    conjugations: {
      present: {
        I: "أستحم",
        he: "يستحم",
        she: "تستحم",
        "they (m)": "يستحمون",
        "they (f)": "يستحمن",
        we: "نستحم",
        "you (m)": "تستحم",
        "you (f)": "تستحمين",
      },
      past: {
        I: "استحمت",
        he: "استحم",
        she: "استحمت",
        "they (m)": "استحموا",
        "they (f)": "استحمن",
        we: "استحممنا",
        "you (m)": "استحمت",
        "you (f)": "استحمتِ",
      },
    },
  },
  {
    id: 29,
    arabic: "استراح يستريح استراحة",
    english: ["to rest", "to relax"],
    categories: ["Verbs", "Health"],
    type: "verb",
    conjugations: {
      present: {
        I: "أستريح",
        he: "يستريح",
        she: "تستريح",
        "they (m)": "يستريحون",
        "they (f)": "يستريحن",
        we: "نستريح",
        "you (m)": "تستريح",
        "you (f)": "تستريحين",
      },
      past: {
        I: "استرحت",
        he: "استراح",
        she: "استراحت",
        "they (m)": "استراحوا",
        "they (f)": "استرحن",
        we: "استرحنا",
        "you (m)": "استرحت",
        "you (f)": "استرحتِ",
      },
    },
  },
  {
    id: 30,
    arabic: "استطاع يستطيع استطاعة",
    english: ["can", "to be able to"],
    categories: ["Verbs", "Ability"],
    type: "verb",
    conjugations: {
      present: {
        I: "أستطيع",
        he: "يستطيع",
        she: "تستطيع",
        "they (m)": "يستطيعون",
        "they (f)": "يستطعن",
        we: "نستطيع",
        "you (m)": "تستطيع",
        "you (f)": "تستطيعين",
      },
      past: {
        I: "استطعت",
        he: "استطاع",
        she: "استطاعت",
        "they (m)": "استطاعوا",
        "they (f)": "استطعن",
        we: "استطعنا",
        "you (m)": "استطعت",
        "you (f)": "استطعتِ",
      },
    },
  },
  {
    id: 31,
    arabic: "استيقظ يستيقظ الاستيقاظ",
    english: ["to wake up"],
    categories: ["Verbs", "Daily Routine"],
    type: "verb",
    conjugations: {
      present: {
        I: "أستيقظ",
        he: "يستيقظ",
        she: "تستيقظ",
        "they (m)": "يستيقظون",
        "they (f)": "يستيقظن",
        we: "نستيقظ",
        "you (m)": "تستيقظ",
        "you (f)": "تستيقظين",
      },
      past: {
        I: "استيقظت",
        he: "استيقظ",
        she: "استيقظت",
        "they (m)": "استيقظوا",
        "they (f)": "استيقظن",
        we: "استيقظنا",
        "you (m)": "استيقظت",
        "you (f)": "استيقظتِ",
      },
    },
  },
  {
    id: 32,
    arabic: "اشترى يشتري الشّراء",
    english: ["to buy", "to purchase"],
    categories: ["Verbs", "Commerce"],
    type: "verb",
    conjugations: {
      present: {
        I: "أشتري",
        he: "يشتري",
        she: "تشتري",
        "they (m)": "يشترون",
        "they (f)": "يشترين",
        we: "نشتري",
        "you (m)": "تشتري",
        "you (f)": "تشترين",
      },
      past: {
        I: "اشتريت",
        he: "اشترى",
        she: "اشترت",
        "they (m)": "اشتروا",
        "they (f)": "اشترين",
        we: "اشترينا",
        "you (m)": "اشتريت",
        "you (f)": "اشتريتِ",
      },
    },
  },
  {
    id: 33,
    arabic: "اُفَضِّل",
    english: ["to prefer"],
    categories: ["Verbs", "Preference"],
    type: "verb",
    conjugations: {
      present: {
        I: "أفضل",
        he: "يفضل",
        she: "تفضل",
        "they (m)": "يفضلون",
        "they (f)": "يفضلن",
        we: "نفضل",
        "you (m)": "تفضل",
        "you (f)": "تفضلين",
      },
      past: {
        I: "فضلت",
        he: "فضل",
        she: "فضلت",
        "they (m)": "فضلوا",
        "they (f)": "فضلن",
        we: "فضلنا",
        "you (m)": "فضلت",
        "you (f)": "فضلتِ",
      },
    },
  },
  {
    id: 34,
    arabic: "التَّصوِير",
    english: ["photography"],
    categories: ["Nouns", "Art"],
    type: "noun",
    forms: {
      singular: "تصوير",
      plural: "تصويرات",
    },
  },
  {
    id: 35,
    arabic: "التلفاز",
    english: ["TV", "television"],
    categories: ["Nouns", "Electronics"],
    type: "noun",
    forms: {
      singular: "تلفاز",
      plural: "تلفازات",
    },
  },
  {
    id: 36,
    arabic: "الثّانَوِيّة",
    english: ["high school"],
    categories: ["Nouns", "Education"],
    type: "noun",
    forms: {
      singular: "ثانوية",
      plural: "ثانويات",
    },
  },
  {
    id: 37,
    arabic: "الجامعة",
    english: ["university"],
    categories: ["Nouns", "Education"],
    type: "noun",
    forms: {
      singular: "جامعة",
      plural: "جامعات",
    },
  },
  {
    id: 38,
    arabic: "الجميع",
    english: ["everyone", "all"],
    categories: ["Nouns", "People"],
    type: "noun",
    forms: {
      singular: "الجميع",
      plural: "الجميع",
    },
  },
  {
    id: 39,
    arabic: "الخَطّ",
    english: ["calligraphy"],
    categories: ["Nouns", "Art"],
    type: "noun",
    forms: {
      singular: "خط",
      plural: "خطوط",
    },
  },
  {
    id: 40,
    arabic: "الرَّسم",
    english: ["drawing"],
    categories: ["Nouns", "Art"],
    type: "noun",
    forms: {
      singular: "رسم",
      plural: "رسومات",
    },
  },
  {
    id: 41,
    arabic: "الرّياضة",
    english: ["sport"],
    categories: ["Nouns", "Activity"],
    type: "noun",
    forms: {
      singular: "رياضة",
      plural: "رياضات",
    },
  },
  {
    id: 42,
    arabic: "السِّباحة",
    english: ["swimming"],
    categories: ["Nouns", "Activity"],
    type: "noun",
    forms: {
      singular: "سباحة",
      plural: "سباحات",
    },
  },
  {
    id: 43,
    arabic: "الشّارع الرَّئِيسِيّ",
    english: ["main street"],
    categories: ["Nouns", "Location"],
    type: "noun",
    forms: {
      singular: "شارع رئيسي",
      plural: "شوارع رئيسية",
    },
  },
  {
    id: 44,
    arabic: "الطّبق الرئيسيّ",
    english: ["main dish"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "طبق رئيسي",
      plural: "أطباق رئيسية",
    },
  },
  {
    id: 45,
    arabic: "القِراءة",
    english: ["reading"],
    categories: ["Nouns", "Activity"],
    type: "noun",
    forms: {
      singular: "قراءة",
      plural: "قراءات",
    },
  },
  {
    id: 46,
    arabic: "اِنْتَظَر يَنْتَظِر الانْتِظار",
    english: ["to wait"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أنتظر",
        he: "ينتظر",
        she: "تنتظر",
        "they (m)": "ينتظرون",
        "they (f)": "ينتظرن",
        we: "ننتظر",
        "you (m)": "تنتظر",
        "you (f)": "تنتظرين",
      },
      past: {
        I: "انتظرت",
        he: "انتظر",
        she: "انتظرت",
        "they (m)": "انتظروا",
        "they (f)": "انتظرن",
        we: "انتظرنا",
        "you (m)": "انتظرت",
        "you (f)": "انتظرتِ",
      },
    },
  },
  {
    id: 47,
    arabic: "اِنْتَهى يَنْتَهي الانْتِهاء",
    english: ["to end", "to finish"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أنتهي",
        he: "ينتهي",
        she: "تنتهي",
        "they (m)": "ينتهون",
        "they (f)": "ينتهين",
        we: "ننتهي",
        "you (m)": "تنتهي",
        "you (f)": "تنتهين",
      },
      past: {
        I: "انتهيت",
        he: "انتهى",
        she: "انتهت",
        "they (m)": "انتهوا",
        "they (f)": "انتهين",
        we: "انتهينا",
        "you (m)": "انتهيت",
        "you (f)": "انتهيتِ",
      },
    },
  },
  {
    id: 48,
    arabic: "اِنْعَطَف يَنْعَطِف الانْعِطاف",
    english: ["to turn"],
    categories: ["Verbs", "Movement"],
    type: "verb",
    conjugations: {
      present: {
        I: "أنعطف",
        he: "ينعطف",
        she: "تنعطف",
        "they (m)": "ينعطفون",
        "they (f)": "ينعطفن",
        we: "ننعطف",
        "you (m)": "تنعطف",
        "you (f)": "تنعطفين",
      },
      past: {
        I: "انعطفت",
        he: "انعطف",
        she: "انعطفت",
        "they (m)": "انعطفوا",
        "they (f)": "انعطفن",
        we: "انعطفنا",
        "you (m)": "انعطفت",
        "you (f)": "انعطفتِ",
      },
    },
  },
  {
    id: 49,
    arabic: "بِاتِّجاه / نَحوَ",
    english: ["towards"],
    categories: ["Prepositions", "Direction"],
    type: "preposition",
  },
  {
    id: 50,
    arabic: "بِالتَّأكيد",
    english: ["of course", "certainly"],
    categories: ["Adverbs", "Expressions"],
    type: "adverb",
  },
  {
    id: 51,
    arabic: "بِجانِبِ = قُرْبَ",
    english: ["near", "next to"],
    categories: ["Prepositions", "Location"],
    type: "preposition",
  },
  {
    id: 52,
    arabic: "بِداية",
    english: ["beginning", "start"],
    categories: ["Nouns", "Time"],
    type: "noun",
    forms: {
      singular: "بداية",
      plural: "بدايات",
    },
  },
  {
    id: 53,
    arabic: "بِسُرعة",
    english: ["fast", "quickly"],
    categories: ["Adverbs", "Speed"],
    type: "adverb",
  },
  {
    id: 54,
    arabic: "بشَكلٍ جيِّد",
    english: ["well"],
    categories: ["Adverbs", "Manner"],
    type: "adverb",
  },
  {
    id: 55,
    arabic: "بِشَكْلٍ مُسْتَقيم",
    english: ["straight"],
    categories: ["Adverbs", "Direction"],
    type: "adverb",
  },
  {
    id: 56,
    arabic: "بصل",
    english: ["onion"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "بصل",
      plural: "بصلات",
    },
  },
  {
    id: 57,
    arabic: "بعد ذلك",
    english: ["after that"],
    categories: ["Adverbs", "Time"],
    type: "adverb",
  },
  {
    id: 58,
    arabic: "بعد قليل",
    english: ["after a short time", "soon"],
    categories: ["Adverbs", "Time"],
    type: "adverb",
  },
  {
    id: 59,
    arabic: "بعد",
    english: ["after"],
    categories: ["Prepositions", "Time"],
    type: "preposition",
  },
  {
    id: 60,
    arabic: "بَعض",
    english: ["some"],
    categories: ["Nouns", "Quantity"],
    type: "noun",
    forms: {
      singular: "بعض",
      plural: "بعض",
    },
  },
  {
    id: 61,
    arabic: "بَعيد",
    english: ["far"],
    categories: ["Adjectives", "Distance"],
    type: "adjective",
  },
  {
    id: 62,
    arabic: "بقدونس",
    english: ["parsley"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "بقدونس",
      plural: "بقدونسات",
    },
  },
  {
    id: 63,
    arabic: "بِكُلِّ سُرورٍ",
    english: ["My pleasure", "with pleasure"],
    categories: ["Expressions", "Politeness"],
    type: "expression",
  },
  {
    id: 64,
    arabic: "بِناء",
    english: ["building"],
    categories: ["Nouns", "Architecture"],
    type: "noun",
    forms: {
      singular: "بناء",
      plural: "بنايات",
    },
  },
  {
    id: 65,
    arabic: "بهارات",
    english: ["spices"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "بهار",
      plural: "بهارات",
    },
  },
  {
    id: 66,
    arabic: "تَحتَ",
    english: ["under", "below"],
    categories: ["Prepositions", "Location"],
    type: "preposition",
  },
  {
    id: 67,
    arabic: "تسوّق يتسوّق التّسوّق",
    english: ["shopping"],
    categories: ["Verbs", "Commerce"],
    type: "verb",
    conjugations: {
      present: {
        I: "أتسوق",
        he: "يتسوق",
        she: "تتسوق",
        "they (m)": "يتسوقون",
        "they (f)": "يتسوقن",
        we: "نتسوق",
        "you (m)": "تتسوق",
        "you (f)": "تتسوقين",
      },
      past: {
        I: "تسوقت",
        he: "تسوق",
        she: "تسوقت",
        "they (m)": "تسوقوا",
        "they (f)": "تسوقن",
        we: "تسوقنا",
        "you (m)": "تسوقت",
        "you (f)": "تسوقتِ",
      },
    },
  },
  {
    id: 68,
    arabic: "تقريباً",
    english: ["almost", "about"],
    categories: ["Adverbs", "Quantity"],
    type: "adverb",
  },
  {
    id: 69,
    arabic: "تناول يتناول تناول (الطعام)",
    english: ["to have (a meal, food)", "to eat"],
    categories: ["Verbs", "Food"],
    type: "verb",
    conjugations: {
      present: {
        I: "أتناول",
        he: "يتناول",
        she: "تتناول",
        "they (m)": "يتناولون",
        "they (f)": "يتناولن",
        we: "نتناول",
        "you (m)": "تتناول",
        "you (f)": "تتناولين",
      },
      past: {
        I: "تناولت",
        he: "تناول",
        she: "تناولت",
        "they (m)": "تناولوا",
        "they (f)": "تناولن",
        we: "تناولنا",
        "you (m)": "تناولت",
        "you (f)": "تناولتِ",
      },
    },
  },
  {
    id: 70,
    arabic: "ثوم",
    english: ["garlic"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "ثوم",
      plural: "ثومات",
    },
  },
  {
    id: 71,
    arabic: "جائع",
    english: ["hungry"],
    categories: ["Adjectives", "Feelings"],
    type: "adjective",
  },
  {
    id: 72,
    arabic: "جُمَل",
    english: ["sentences"],
    categories: ["Nouns", "Language"],
    type: "noun",
    forms: {
      singular: "جملة",
      plural: "جمل",
    },
  },
  {
    id: 73,
    arabic: "جهّز يجهّز التجهيز",
    english: ["to prepare"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أجهز",
        he: "يجهز",
        she: "تجهز",
        "they (m)": "يجهزون",
        "they (f)": "يجهزن",
        we: "نجهز",
        "you (m)": "تجهز",
        "you (f)": "تجهزين",
      },
      past: {
        I: "جهزت",
        he: "جهز",
        she: "جهزت",
        "they (m)": "جهزوا",
        "they (f)": "جهزن",
        we: "جهزنا",
        "you (m)": "جهزت",
        "you (f)": "جهزتِ",
      },
    },
  },
  {
    id: 74,
    arabic: "حاجات المنزل",
    english: ["things for home", "household items"],
    categories: ["Nouns", "Household"],
    type: "noun",
    forms: {
      singular: "حاجة المنزل",
      plural: "حاجات المنزل",
    },
  },
  {
    id: 75,
    arabic: "حاسوب",
    english: ["computer"],
    categories: ["Nouns", "Technology"],
    type: "noun",
    forms: {
      singular: "حاسوب",
      plural: "حواسيب",
    },
  },
  {
    id: 76,
    arabic: "حتّى الآن",
    english: ["until now"],
    categories: ["Adverbs", "Time"],
    type: "adverb",
  },
  {
    id: 77,
    arabic: "حضّر يحضِّر التّحضير",
    english: ["to prepare"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أحضّر",
        he: "يحضّر",
        she: "تحضّر",
        "they (m)": "يحضّرون",
        "they (f)": "يحضّرن",
        we: "نحضّر",
        "you (m)": "تحضّر",
        "you (f)": "تحضّرين",
      },
      past: {
        I: "حضّرت",
        he: "حضّر",
        she: "حضّرت",
        "they (m)": "حضّروا",
        "they (f)": "حضّرن",
        we: "حضّرنا",
        "you (m)": "حضّرت",
        "you (f)": "حضّرتِ",
      },
    },
  },
  {
    id: 78,
    arabic: "خاصة",
    english: ["especially"],
    categories: ["Adverbs", "Expressions"],
    type: "adverb",
  },
  {
    id: 79,
    arabic: "خِبْرَة",
    english: ["experience"],
    categories: ["Nouns", "Knowledge"],
    type: "noun",
    forms: {
      singular: "خبرة",
      plural: "خبرات",
    },
  },
  {
    id: 80,
    arabic: "خبز",
    english: ["bread"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "خبز",
      plural: "أخباز",
    },
  },
  {
    id: 81,
    arabic: "خسّ",
    english: ["lettuce"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "خسّ",
      plural: "خسّات",
    },
  },
  {
    id: 82,
    arabic: "خضار",
    english: ["vegetables"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "خضار",
      plural: "خضروات",
    },
  },
  {
    id: 83,
    arabic: "خلّ",
    english: ["vinegar"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "خلّ",
      plural: "خلول",
    },
  },
  {
    id: 84,
    arabic: "خَلْفَ = وَراءَ",
    english: ["behind"],
    categories: ["Prepositions", "Location"],
    type: "preposition",
  },
  {
    id: 85,
    arabic: "خيار",
    english: ["cucumber"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "خيار",
      plural: "خيارات",
    },
  },
  {
    id: 86,
    arabic: "خيَّاط",
    english: ["tailor"],
    categories: ["Nouns", "Profession"],
    type: "noun",
    forms: {
      singular: "خياط",
      plural: "خياطون",
    },
  },
  {
    id: 87,
    arabic: "دجاج",
    english: ["chicken"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "دجاجة",
      plural: "دجاج",
    },
  },
  {
    id: 88,
    arabic: "دَرَج",
    english: ["stairs"],
    categories: ["Nouns", "Architecture"],
    type: "noun",
    forms: {
      singular: "درج",
      plural: "أدراج",
    },
  },
  {
    id: 89,
    arabic: "دَوام جُزْئيّ",
    english: ["part-time"],
    categories: ["Nouns", "Work"],
    type: "noun",
    forms: {
      singular: "دوام جزئي",
      plural: "دوامات جزئية",
    },
  },
  {
    id: 90,
    arabic: "دَوام كامِل",
    english: ["full-time"],
    categories: ["Nouns", "Work"],
    type: "noun",
    forms: {
      singular: "دوام كامل",
      plural: "دوامات كاملة",
    },
  },
  {
    id: 91,
    arabic: "دوام",
    english: ["working hours"],
    categories: ["Nouns", "Work"],
    type: "noun",
    forms: {
      singular: "دوام",
      plural: "دوامات",
    },
  },
  {
    id: 92,
    arabic: "رائع",
    english: ["great", "wonderful"],
    categories: ["Adjectives", "Feelings"],
    type: "adjective",
  },
  {
    id: 93,
    arabic: "راتِب",
    english: ["salary"],
    categories: ["Nouns", "Work"],
    type: "noun",
    forms: {
      singular: "راتب",
      plural: "رواتب",
    },
  },
  {
    id: 94,
    arabic: "رَكِب يَرْكَب الرُّكوب",
    english: ["to ride"],
    categories: ["Verbs", "Transportation"],
    type: "verb",
    conjugations: {
      present: {
        I: "أركب",
        he: "يركب",
        she: "تركب",
        "they (m)": "يركبون",
        "they (f)": "يركبن",
        we: "نركب",
        "you (m)": "تركب",
        "you (f)": "تركبين",
      },
      past: {
        I: "ركبت",
        he: "ركب",
        she: "ركبت",
        "they (m)": "ركبوا",
        "they (f)": "ركبن",
        we: "ركبنا",
        "you (m)": "ركبت",
        "you (f)": "ركبتِ",
      },
    },
  },
  {
    id: 95,
    arabic: "زبون ج. زبائن",
    english: ["customer", "customers"],
    categories: ["Nouns", "Commerce"],
    type: "noun",
    forms: {
      singular: "زبون",
      plural: "زبائن",
    },
  },
  {
    id: 96,
    arabic: "زميل ج. زملاء",
    english: ["colleague", "classmate"],
    categories: ["Nouns", "People"],
    type: "noun",
    forms: {
      singular: "زميل",
      plural: "زملاء",
    },
  },
  {
    id: 97,
    arabic: "زيت",
    english: ["oil"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "زيت",
      plural: "زيوت",
    },
  },
  {
    id: 98,
    arabic: "زيتون",
    english: ["olives"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "زيتونة",
      plural: "زيتون",
    },
  },
  {
    id: 99,
    arabic: "سلطة",
    english: ["salad"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "سلطة",
      plural: "سلطات",
    },
  },
  {
    id: 100,
    arabic: "سمك",
    english: ["fish"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "سمكة",
      plural: "أسماك",
    },
  },
  {
    id: 101,
    arabic: "سنّ ج.أسنان",
    english: ["tooth", "teeth"],
    categories: ["Nouns", "Body"],
    type: "noun",
    forms: {
      singular: "سنّ",
      plural: "أسنان",
    },
  },
  {
    id: 102,
    arabic: "سيّد",
    english: ["Mr."],
    categories: ["Nouns", "Titles"],
    type: "noun",
    forms: {
      singular: "سيّد",
      plural: "سادة",
    },
  },
  {
    id: 103,
    arabic: "سيّدة",
    english: ["Mrs."],
    categories: ["Nouns", "Titles"],
    type: "noun",
    forms: {
      singular: "سيّدة",
      plural: "سيّدات",
    },
  },
  {
    id: 104,
    arabic: "شابّ",
    english: ["young"],
    categories: ["Adjectives", "Age"],
    type: "adjective",
  },
  {
    id: 105,
    arabic: "شارِع ج. شَوارِع",
    english: ["street", "streets"],
    categories: ["Nouns", "Location"],
    type: "noun",
    forms: {
      singular: "شارع",
      plural: "شوارع",
    },
  },
  {
    id: 106,
    arabic: "شبعان",
    english: ["full (ate enough)"],
    categories: ["Adjectives", "Feelings"],
    type: "adjective",
  },
  {
    id: 107,
    arabic: "شَرْط",
    english: ["condition"],
    categories: ["Nouns"],
    type: "noun",
    forms: {
      singular: "شرط",
      plural: "شروط",
    },
  },
  {
    id: 108,
    arabic: "شَرِكَة",
    english: ["company"],
    categories: ["Nouns", "Business"],
    type: "noun",
    forms: {
      singular: "شركة",
      plural: "شركات",
    },
  },
  {
    id: 109,
    arabic: "صباحاً",
    english: ["in the morning"],
    categories: ["Adverbs", "Time"],
    type: "adverb",
  },
  {
    id: 110,
    arabic: "صحّيّ",
    english: ["healthy"],
    categories: ["Adjectives", "Health"],
    type: "adjective",
  },
  {
    id: 111,
    arabic: "صديق / أصدقاء",
    english: ["friend", "friends"],
    categories: ["Nouns", "People"],
    type: "noun",
    forms: {
      singular: "صديق",
      plural: "أصدقاء",
    },
  },
  {
    id: 112,
    arabic: "طَبَّاخ",
    english: ["a cook"],
    categories: ["Nouns", "Profession"],
    type: "noun",
    forms: {
      singular: "طبّاخ",
      plural: "طبّاخون",
    },
  },
  {
    id: 113,
    arabic: "طبخ يطبخ الطّبخ",
    english: ["to cook"],
    categories: ["Verbs", "Food"],
    type: "verb",
    conjugations: {
      present: {
        I: "أطبخ",
        he: "يطبخ",
        she: "تطبخ",
        "they (m)": "يطبخون",
        "they (f)": "يطبخن",
        we: "نطبخ",
        "you (m)": "تطبخ",
        "you (f)": "تطبخين",
      },
      past: {
        I: "طبخت",
        he: "طبخ",
        she: "طبخت",
        "they (m)": "طبخوا",
        "they (f)": "طبخن",
        we: "طبخنا",
        "you (m)": "طبخت",
        "you (f)": "طبختِ",
      },
    },
  },
  {
    id: 114,
    arabic: "طَريق ج. طُرُق",
    english: ["way", "road"],
    categories: ["Nouns", "Transportation"],
    type: "noun",
    forms: {
      singular: "طريق",
      plural: "طرق",
    },
  },
  {
    id: 115,
    arabic: "طَريق فرعِيّ",
    english: ["side road"],
    categories: ["Nouns", "Transportation"],
    type: "noun",
    forms: {
      singular: "طريق فرعي",
      plural: "طرق فرعية",
    },
  },
  {
    id: 116,
    arabic: "طعم",
    english: ["taste"],
    categories: ["Nouns", "Senses"],
    type: "noun",
    forms: {
      singular: "طعم",
      plural: "طعوم",
    },
  },
  {
    id: 117,
    arabic: "طماطم",
    english: ["tomatoes"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "طماطم",
      plural: "طماطمات",
    },
  },
  {
    id: 118,
    arabic: "طيب ، حَسناً",
    english: ["OK"],
    categories: ["Expressions", "Expressions"],
    type: "expression",
  },
  {
    id: 119,
    arabic: "ظهراً",
    english: ["noon"],
    categories: ["Adverbs", "Time"],
    type: "adverb",
  },
  {
    id: 120,
    arabic: "عامِل",
    english: ["worker"],
    categories: ["Nouns", "Profession"],
    type: "noun",
    forms: {
      singular: "عامل",
      plural: "عمال",
    },
  },
  {
    id: 121,
    arabic: "عطلة",
    english: ["day off"],
    categories: ["Nouns", "Time"],
    type: "noun",
    forms: {
      singular: "عطلة",
      plural: "عطل",
    },
  },
  {
    id: 122,
    arabic: "عفواً",
    english: ["excuse me"],
    categories: ["Expressions", "Politeness"],
    type: "expression",
  },
  {
    id: 123,
    arabic: "على الأقلّ",
    english: ["at least"],
    categories: ["Adverbs", "Quantity"],
    type: "adverb",
  },
  {
    id: 124,
    arabic: "على بُعْدِ",
    english: ["(a distance) away"],
    categories: ["Prepositions", "Distance"],
    type: "preposition",
  },
  {
    id: 125,
    arabic: "عندي",
    english: ["I have"],
    categories: ["Expressions", "Possession"],
    type: "expression",
  },
  {
    id: 126,
    arabic: "عُنْوان ج. عَناوِين",
    english: ["address", "addresses"],
    categories: ["Nouns", "Location"],
    type: "noun",
    forms: {
      singular: "عنوان",
      plural: "عناوين",
    },
  },
  {
    id: 127,
    arabic: "غاضب",
    english: ["angry"],
    categories: ["Adjectives", "Feelings"],
    type: "adjective",
  },
  {
    id: 128,
    arabic: "غسل يغسل الغسل",
    english: ["to wash"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أغسل",
        he: "يغسل",
        she: "تغسل",
        "they (m)": "يغسلون",
        "they (f)": "يغسلن",
        we: "نغسل",
        "you (m)": "تغسل",
        "you (f)": "تغسلين",
      },
      past: {
        I: "غسلت",
        he: "غسل",
        she: "غسلت",
        "they (m)": "غسلوا",
        "they (f)": "غسلن",
        we: "غسلنا",
        "you (m)": "غسلت",
        "you (f)": "غسلتِ",
      },
    },
  },
  {
    id: 129,
    arabic: "فرن ج. أفران",
    english: ["oven", "ovens"],
    categories: ["Nouns", "Household"],
    type: "noun",
    forms: {
      singular: "فرن",
      plural: "أفران",
    },
  },
  {
    id: 130,
    arabic: "فقط",
    english: ["only", "just"],
    categories: ["Adverbs", "Quantity"],
    type: "adverb",
  },
  {
    id: 131,
    arabic: "فُنْدُق ج. فَنادِق",
    english: ["hotel", "hotels"],
    categories: ["Nouns", "Accommodation"],
    type: "noun",
    forms: {
      singular: "فندق",
      plural: "فنادق",
    },
  },
  {
    id: 132,
    arabic: "فَوقَ",
    english: ["above", "on top of"],
    categories: ["Prepositions", "Location"],
    type: "preposition",
  },
  {
    id: 133,
    arabic: "قائمة الطعام",
    english: ["menu"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "قائمة الطعام",
      plural: "قوائم الطعام",
    },
  },
  {
    id: 134,
    arabic: "قبل",
    english: ["before"],
    categories: ["Prepositions", "Time"],
    type: "preposition",
  },
  {
    id: 135,
    arabic: "قَريب",
    english: ["near", "close"],
    categories: ["Adjectives", "Distance"],
    type: "adjective",
  },
  {
    id: 136,
    arabic: "قصير",
    english: ["short"],
    categories: ["Adjectives", "Size"],
    type: "adjective",
  },
  {
    id: 137,
    arabic: "قطّع يقطّع التقطيع",
    english: ["to cut"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أقطّع",
        he: "يقطّع",
        she: "تقطّع",
        "they (m)": "يقطّعون",
        "they (f)": "يقطّعن",
        we: "نقطّع",
        "you (m)": "تقطّع",
        "you (f)": "تقطّعين",
      },
      past: {
        I: "قطّعت",
        he: "قطّع",
        she: "قطّعت",
        "they (m)": "قطّعوا",
        "they (f)": "قطّعن",
        we: "قطّعنا",
        "you (m)": "قطّعت",
        "you (f)": "قطّعتِ",
      },
    },
  },
  {
    id: 138,
    arabic: "قَطَع يَقْطَع الشّارِعَ",
    english: ["to cross the street"],
    categories: ["Verbs", "Movement"],
    type: "verb",
    conjugations: {
      present: {
        I: "أقطع",
        he: "يقطع",
        she: "تقطع",
        "they (m)": "يقطعون",
        "they (f)": "يقطعن",
        we: "نقطع",
        "you (m)": "تقطع",
        "you (f)": "تقطعين",
      },
      past: {
        I: "قطعت",
        he: "قطع",
        she: "قطعت",
        "they (m)": "قطعوا",
        "they (f)": "قطعن",
        we: "قطعنا",
        "you (m)": "قطعت",
        "you (f)": "قطعتِ",
      },
    },
  },
  {
    id: 139,
    arabic: "قطعة ج. قِطَع",
    english: ["piece", "pieces"],
    categories: ["Nouns", "Quantity"],
    type: "noun",
    forms: {
      singular: "قطعة",
      plural: "قطع",
    },
  },
  {
    id: 140,
    arabic: "قليلاً",
    english: ["a little"],
    categories: ["Adverbs", "Quantity"],
    type: "adverb",
  },
  {
    id: 141,
    arabic: "لبس يلبس اللّبس",
    english: ["to wear"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "ألبس",
        he: "يلبس",
        she: "تلبس",
        "they (m)": "يلبسون",
        "they (f)": "يلبسن",
        we: "نلبس",
        "you (m)": "تلبس",
        "you (f)": "تلبسين",
      },
      past: {
        I: "لبست",
        he: "لبس",
        she: "لبست",
        "they (m)": "لبسوا",
        "they (f)": "لبسن",
        we: "لبسنا",
        "you (m)": "لبست",
        "you (f)": "لبستِ",
      },
    },
  },
  {
    id: 142,
    arabic: "لبن",
    english: ["yoghurt"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "لبن",
      plural: "ألبان",
    },
  },
  {
    id: 143,
    arabic: "لحم",
    english: ["meat"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "لحم",
      plural: "لحوم",
    },
  },
  {
    id: 144,
    arabic: "لِذَلِك",
    english: ["therefore"],
    categories: ["Conjunctions", "Expressions"],
    type: "conjunction",
  },
  {
    id: 145,
    arabic: "لُغة، لُغات",
    english: ["language", "languages"],
    categories: ["Nouns", "Language"],
    type: "noun",
    forms: {
      singular: "لغة",
      plural: "لغات",
    },
  },
  {
    id: 146,
    arabic: "لمدّة",
    english: ["for (a period of time)"],
    categories: ["Prepositions", "Time"],
    type: "preposition",
  },
  {
    id: 147,
    arabic: "ليس عندي",
    english: ["I don't have"],
    categories: ["Expressions", "Possession"],
    type: "expression",
  },
  {
    id: 148,
    arabic: "مائدة ج. موائد",
    english: ["dining table", "dining tables"],
    categories: ["Nouns", "Furniture"],
    type: "noun",
    forms: {
      singular: "مائدة",
      plural: "موائد",
    },
  },
  {
    id: 149,
    arabic: "مارس يمارس ممارسة (الرياضة)",
    english: ["to do sports"],
    categories: ["Verbs", "Activity"],
    type: "verb",
    conjugations: {
      present: {
        I: "أمارس",
        he: "يمارس",
        she: "تمارس",
        "they (m)": "يمارسون",
        "they (f)": "يمارسن",
        we: "نمارس",
        "you (m)": "تمارس",
        "you (f)": "تمارسين",
      },
      past: {
        I: "مارست",
        he: "مارس",
        she: "مارست",
        "they (m)": "مارسوا",
        "they (f)": "مارسن",
        we: "مارسنا",
        "you (m)": "مارست",
        "you (f)": "مارستِ",
      },
    },
  },
  {
    id: 150,
    arabic: "ماهر",
    english: ["skillful"],
    categories: ["Adjectives", "Ability"],
    type: "adjective",
  },
  {
    id: 151,
    arabic: "مباشرة",
    english: ["directly"],
    categories: ["Adverbs", "Manner"],
    type: "adverb",
  },
  {
    id: 152,
    arabic: "مبكر",
    english: ["early"],
    categories: ["Adjectives", "Time"],
    type: "adjective",
  },
  {
    id: 153,
    arabic: "متأخر",
    english: ["late"],
    categories: ["Adjectives", "Time"],
    type: "adjective",
  },
  {
    id: 154,
    arabic: "مَتْحَف ج. مَتاحِف",
    english: ["museum", "museums"],
    categories: ["Nouns", "Places"],
    type: "noun",
    forms: {
      singular: "متحف",
      plural: "متاحف",
    },
  },
  {
    id: 155,
    arabic: "مُتَرْجِم",
    english: ["translator"],
    categories: ["Nouns", "Profession"],
    type: "noun",
    forms: {
      singular: "مترجم",
      plural: "مترجمون",
    },
  },
  {
    id: 156,
    arabic: "متعِب",
    english: ["tiring"],
    categories: ["Adjectives", "Feelings"],
    type: "adjective",
  },
  {
    id: 157,
    arabic: "مَحَطَّة",
    english: ["station"],
    categories: ["Nouns", "Transportation"],
    type: "noun",
    forms: {
      singular: "محطة",
      plural: "محطات",
    },
  },
  {
    id: 158,
    arabic: "مَحَلّ ج. مَحَلَّات (تِجارِيّة)",
    english: ["store", "stores"],
    categories: ["Nouns", "Commerce"],
    type: "noun",
    forms: {
      singular: "محل",
      plural: "محلات",
    },
  },
  {
    id: 159,
    arabic: "مدينة",
    english: ["city"],
    categories: ["Nouns", "Location"],
    type: "noun",
    forms: {
      singular: "مدينة",
      plural: "مدن",
    },
  },
  {
    id: 160,
    arabic: "مساءً",
    english: ["in the evening"],
    categories: ["Adverbs", "Time"],
    type: "adverb",
  },
  {
    id: 161,
    arabic: "مُسْتَشْفى",
    english: ["hospital"],
    categories: ["Nouns", "Places"],
    type: "noun",
    forms: {
      singular: "مستشفى",
      plural: "مستشفيات",
    },
  },
  {
    id: 162,
    arabic: "مسلوق",
    english: ["boiled"],
    categories: ["Adjectives", "Food"],
    type: "adjective",
  },
  {
    id: 163,
    arabic: "مشويّ",
    english: ["grilled"],
    categories: ["Adjectives", "Food"],
    type: "adjective",
  },
  {
    id: 164,
    arabic: "مَشَى يَمْشي المَشْي",
    english: ["to walk"],
    categories: ["Verbs", "Movement"],
    type: "verb",
    conjugations: {
      present: {
        I: "أمشي",
        he: "يمشي",
        she: "تمشي",
        "they (m)": "يمشون",
        "they (f)": "يمشين",
        we: "نمشي",
        "you (m)": "تمشي",
        "you (f)": "تمشين",
      },
      past: {
        I: "مشيت",
        he: "مشى",
        she: "مشت",
        "they (m)": "مشوا",
        "they (f)": "مشين",
        we: "مشينا",
        "you (m)": "مشيت",
        "you (f)": "مشيتِ",
      },
    },
  },
  {
    id: 165,
    arabic: "مِصعَد ج. مَصاعِد",
    english: ["elevator", "elevators"],
    categories: ["Nouns", "Transportation"],
    type: "noun",
    forms: {
      singular: "مصعد",
      plural: "مصاعد",
    },
  },
  {
    id: 166,
    arabic: "مَطْعَم",
    english: ["restaurant"],
    categories: ["Nouns", "Places"],
    type: "noun",
    forms: {
      singular: "مطعم",
      plural: "مطاعم",
    },
  },
  {
    id: 167,
    arabic: "مَعَ الأَسَفِ / لِلأَسَفِ",
    english: ["unfortunately"],
    categories: ["Expressions", "Emotion"],
    type: "expression",
  },
  {
    id: 168,
    arabic: "مُفيد",
    english: ["beneficial"],
    categories: ["Adjectives", "Quality"],
    type: "adjective",
  },
  {
    id: 169,
    arabic: "مُقابِلَ",
    english: ["opposite of"],
    categories: ["Prepositions", "Location"],
    type: "preposition",
  },
  {
    id: 170,
    arabic: "مقبّلات",
    english: ["appetizers"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "مقبّلة",
      plural: "مقبّلات",
    },
  },
  {
    id: 171,
    arabic: "مقليّ",
    english: ["fried"],
    categories: ["Adjectives", "Food"],
    type: "adjective",
  },
  {
    id: 172,
    arabic: "مكسّرات",
    english: ["nuts"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "مكسّرة",
      plural: "مكسّرات",
    },
  },
  {
    id: 173,
    arabic: "ملابس",
    english: ["clothes"],
    categories: ["Nouns", "Apparel"],
    type: "noun",
    forms: {
      singular: "ملبس",
      plural: "ملابس",
    },
  },
  {
    id: 174,
    arabic: "ملح",
    english: ["salt"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "ملح",
      plural: "أملاح",
    },
  },
  {
    id: 175,
    arabic: "ملعقة ج. ملاعق",
    english: ["spoon", "spoons"],
    categories: ["Nouns", "Utensils"],
    type: "noun",
    forms: {
      singular: "ملعقة",
      plural: "ملاعق",
    },
  },
  {
    id: 176,
    arabic: "مُمَرِّضَة",
    english: ["nurse"],
    categories: ["Nouns", "Profession"],
    type: "noun",
    forms: {
      singular: "ممرضة",
      plural: "ممرضات",
    },
  },
  {
    id: 177,
    arabic: "من...حتّى...",
    english: ["from... to..."],
    categories: ["Prepositions", "Time"],
    type: "preposition",
  },
  {
    id: 178,
    arabic: "مناسب",
    english: ["suitable", "appropriate"],
    categories: ["Adjectives", "Quality"],
    type: "adjective",
  },
  {
    id: 179,
    arabic: "مُهِمّة",
    english: ["important"],
    categories: ["Adjectives", "Quality"],
    type: "adjective",
  },
  {
    id: 180,
    arabic: "مهنة ج. مهن",
    english: ["job", "occupation"],
    categories: ["Nouns", "Profession"],
    type: "noun",
    forms: {
      singular: "مهنة",
      plural: "مهن",
    },
  },
  {
    id: 181,
    arabic: "مُهَنْدِس",
    english: ["engineer"],
    categories: ["Nouns", "Profession"],
    type: "noun",
    forms: {
      singular: "مهندس",
      plural: "مهندسون",
    },
  },
  {
    id: 182,
    arabic: "موعد ج. مواعيد",
    english: ["appointment", "appointments"],
    categories: ["Nouns", "Time"],
    type: "noun",
    forms: {
      singular: "موعد",
      plural: "مواعيد",
    },
  },
  {
    id: 183,
    arabic: "مَوْقِف السَّيّارات",
    english: ["parking lot"],
    categories: ["Nouns", "Transportation"],
    type: "noun",
    forms: {
      singular: "موقف السيارات",
      plural: "مواقف السيارات",
    },
  },
  {
    id: 184,
    arabic: "نادل",
    english: ["waiter"],
    categories: ["Nouns", "Profession"],
    type: "noun",
    forms: {
      singular: "نادل",
      plural: "نوادل",
    },
  },
  {
    id: 185,
    arabic: "نادي",
    english: ["club"],
    categories: ["Nouns", "Places"],
    type: "noun",
    forms: {
      singular: "نادي",
      plural: "نوادي",
    },
  },
  {
    id: 186,
    arabic: "نَزَل يَنْزِل النُّزول",
    english: ["to go down"],
    categories: ["Verbs", "Movement"],
    type: "verb",
    conjugations: {
      present: {
        I: "أنزل",
        he: "ينزل",
        she: "تنزل",
        "they (m)": "ينزلون",
        "they (f)": "ينزلن",
        we: "ننزل",
        "you (m)": "تنزل",
        "you (f)": "تنزلين",
      },
      past: {
        I: "نزلت",
        he: "نزل",
        she: "نزلت",
        "they (m)": "نزلوا",
        "they (f)": "نزلن",
        we: "نزلنا",
        "you (m)": "نزلت",
        "you (f)": "نزلتِ",
      },
    },
  },
  {
    id: 187,
    arabic: "نشاط",
    english: ["activeness"],
    categories: ["Nouns", "Quality"],
    type: "noun",
    forms: {
      singular: "نشاط",
      plural: "أنشطة",
    },
  },
  {
    id: 188,
    arabic: "نَشِيط",
    english: ["active"],
    categories: ["Adjectives", "Quality"],
    type: "adjective",
  },
  {
    id: 189,
    arabic: "نضج ينضج النضج",
    english: ["to become ripe/cooked"],
    categories: ["Verbs", "Food"],
    type: "verb",
    conjugations: {
      present: {
        I: "أنضج",
        he: "ينضج",
        she: "تنضج",
        "they (m)": "ينضجون",
        "they (f)": "ينضجن",
        we: "ننضج",
        "you (m)": "تنضج",
        "you (f)": "تنضجين",
      },
      past: {
        I: "نضجت",
        he: "نضج",
        she: "نضجت",
        "they (m)": "نضجوا",
        "they (f)": "نضجن",
        we: "نضجنا",
        "you (m)": "نضجت",
        "you (f)": "نضجتِ",
      },
    },
  },
  {
    id: 190,
    arabic: "نظّف ينظّف التّنظيف",
    english: ["to clean"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أنظف",
        he: "ينظف",
        she: "تنظف",
        "they (m)": "ينظفون",
        "they (f)": "ينظفن",
        we: "ننظف",
        "you (m)": "تنظف",
        "you (f)": "تنظفين",
      },
      past: {
        I: "نظفت",
        he: "نظف",
        she: "نظفت",
        "they (m)": "نظفوا",
        "they (f)": "نظفن",
        we: "نظفنا",
        "you (m)": "نظفت",
        "you (f)": "نظفتِ",
      },
    },
  },
  {
    id: 191,
    arabic: "نعناع",
    english: ["mint"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "نعناع",
      plural: "نعانعات",
    },
  },
  {
    id: 192,
    arabic: "نَفْس",
    english: ["same"],
    categories: ["Adjectives", "Quality"],
    type: "adjective",
  },
  {
    id: 193,
    arabic: "نِهاية",
    english: ["the end"],
    categories: ["Nouns", "Time"],
    type: "noun",
    forms: {
      singular: "نهاية",
      plural: "نهايات",
    },
  },
  {
    id: 194,
    arabic: "نوع ج. أنواع",
    english: ["a kind of", "types"],
    categories: ["Nouns", "Classification"],
    type: "noun",
    forms: {
      singular: "نوع",
      plural: "أنواع",
    },
  },
  {
    id: 195,
    arabic: "واجب، ج.واجبات",
    english: ["homework", "homeworks"],
    categories: ["Nouns", "Education"],
    type: "noun",
    forms: {
      singular: "واجب",
      plural: "واجبات",
    },
  },
  {
    id: 196,
    arabic: "وجبة",
    english: ["meal"],
    categories: ["Nouns", "Food"],
    type: "noun",
    forms: {
      singular: "وجبة",
      plural: "وجبات",
    },
  },
  {
    id: 197,
    arabic: "وَجَدَ يَجِدُ الإيْجاد",
    english: ["to find"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أجد",
        he: "يجد",
        she: "تجد",
        "they (m)": "يجدون",
        "they (f)": "يجدن",
        we: "نجد",
        "you (m)": "تجد",
        "you (f)": "تجدين",
      },
      past: {
        I: "وجدت",
        he: "وجد",
        she: "وجدت",
        "they (m)": "وجدوا",
        "they (f)": "وجدن",
        we: "وجدنا",
        "you (m)": "وجدت",
        "you (f)": "وجدتِ",
      },
    },
  },
  {
    id: 198,
    arabic: "وجه ج. وُجوه",
    english: ["face", "faces"],
    categories: ["Nouns", "Body"],
    type: "noun",
    forms: {
      singular: "وجه",
      plural: "وجوه",
    },
  },
  {
    id: 199,
    arabic: "وَسَط",
    english: ["in the middle of"],
    categories: ["Prepositions", "Location"],
    type: "preposition",
  },
  {
    id: 200,
    arabic: "وَصَلَ يَصِل الوُصول",
    english: ["to arrive"],
    categories: ["Verbs", "Movement"],
    type: "verb",
    conjugations: {
      present: {
        I: "أصل",
        he: "يصل",
        she: "تصل",
        "they (m)": "يصلون",
        "they (f)": "يصلن",
        we: "نصل",
        "you (m)": "تصل",
        "you (f)": "تصلين",
      },
      past: {
        I: "وصلت",
        he: "وصل",
        she: "وصلت",
        "they (m)": "وصلوا",
        "they (f)": "وصلن",
        we: "وصلنا",
        "you (m)": "وصلت",
        "you (f)": "وصلتِ",
      },
    },
  },
  {
    id: 201,
    arabic: "وضع يضع الوضع",
    english: ["to put"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أضع",
        he: "يضع",
        she: "تضع",
        "they (m)": "يضعون",
        "they (f)": "يضعن",
        we: "نضع",
        "you (m)": "تضع",
        "you (f)": "تضعين",
      },
      past: {
        I: "وضعت",
        he: "وضع",
        she: "وضعت",
        "they (m)": "وضعوا",
        "they (f)": "وضعن",
        we: "وضعنا",
        "you (m)": "وضعت",
        "you (f)": "وضعتِ",
      },
    },
  },
  {
    id: 202,
    arabic: "وعاء ج. أوعية",
    english: ["container", "pot"],
    categories: ["Nouns", "Household"],
    type: "noun",
    forms: {
      singular: "وعاء",
      plural: "أوعية",
    },
  },
  {
    id: 203,
    arabic: "وَقَف يَقِف الوُقوف",
    english: ["to stand"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أقف",
        he: "يقف",
        she: "تقف",
        "they (m)": "يقفون",
        "they (f)": "يقفن",
        we: "نقف",
        "you (m)": "تقف",
        "you (f)": "تقفين",
      },
      past: {
        I: "وقفت",
        he: "وقف",
        she: "وقفت",
        "they (m)": "وقفوا",
        "they (f)": "وقفن",
        we: "وقفنا",
        "you (m)": "وقفت",
        "you (f)": "وقفتِ",
      },
    },
  },
  {
    id: 204,
    arabic: "يَبْدو أَنَّ",
    english: ["it seems that"],
    categories: ["Expressions", "Mental"],
    type: "expression",
  },
  {
    id: 205,
    arabic: "يجب أن",
    english: ["have to"],
    categories: ["Expressions", "Necessity"],
    type: "expression",
  },
  {
    id: 206,
    arabic: "يد ج. أيدي",
    english: ["hand", "hands"],
    categories: ["Nouns", "Body"],
    type: "noun",
    forms: {
      singular: "يد",
      plural: "أيدي",
    },
  },
  {
    id: 207,
    arabic: "يَسار",
    english: ["left"],
    categories: ["Nouns", "Direction"],
    type: "noun",
    forms: {
      singular: "يسار",
      plural: "يسارات",
    },
  },
  {
    id: 208,
    arabic: "يسْتَخْدم",
    english: ["to use"],
    categories: ["Verbs", "Action"],
    type: "verb",
    conjugations: {
      present: {
        I: "أستخدم",
        he: "يستخدم",
        she: "تستخدم",
        "they (m)": "يستخدمون",
        "they (f)": "يستخدمن",
        we: "نستخدم",
        "you (m)": "تستخدم",
        "you (f)": "تستخدمين",
      },
      past: {
        I: "استخدمت",
        he: "استخدم",
        she: "استخدمت",
        "they (m)": "استخدموا",
        "they (f)": "استخدمن",
        we: "استخدمنا",
        "you (m)": "استخدمت",
        "you (f)": "استخدمتِ",
      },
    },
  },
  {
    id: 209,
    arabic: "يستطيع أن",
    english: ["can (able to)"],
    categories: ["Expressions", "Ability"],
    type: "expression",
  },
  {
    id: 210,
    arabic: "يُمْكِنُ أَنْ",
    english: ["can"],
    categories: ["Expressions", "Ability"],
    type: "expression",
  },
  {
    id: 211,
    arabic: "يَمين",
    english: ["right"],
    categories: ["Nouns", "Direction"],
    type: "noun",
    forms: {
      singular: "يمين",
      plural: "يمينات",
    },
  },
];
const allCategories = [
  ...new Set(vocabularyData.flatMap((item) => item.categories)),
];

const pronouns = {
  I: "أنا",
  he: "هو",
  she: "هي",
  "they (m)": "هم",
  "they (f)": "هنّ",
  we: "نحن",
  "you (m)": "أنتَ",
  "you (f)": "أنتِ",
};

const ConjugationTable = ({ conjugations, tense }) => (
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

const VocabularyCard = ({ item, onStarToggle, isStarred }) => {
  const [activeTab, setActiveTab] = useState("present");

  const handleReportIssue = () => {
    const subject = encodeURIComponent(`Issue Report: ${item.arabic}`);
    const body = encodeURIComponent(
      `I'd like to report an issue with the following vocabulary item:\n\nArabic: ${
        item.arabic
      }\nEnglish: ${item.english.join(", ")}\n\nPlease describe the issue:`
    );
    window.location.href = `mailto:fadbz08@gmail.com?subject=${subject}&body=${body}`;
  };

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
        <div className="flex flex-wrap gap-2 mb-4">
          {item.categories.map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 text-xs rounded-full"
            >
              {category}
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

const ArabicVocabularyDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [starredItems, setStarredItems] = useState([]);
  const [showStarredOnly, setShowStarredOnly] = useState(false);

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

  const handleStarToggle = (itemId) => {
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
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md appearance-none bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="">All Categories</option>
            {allCategories.sort().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
            📁
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
          />
        ))}
      </div>
    </div>
  );
};

export default ArabicVocabularyDashboard;
