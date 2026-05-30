import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  ar: {
    search: 'ابحث عن وجهتك...',
    explore: 'استكشف',
    home: 'الرئيسية',
    messages: 'الرسائل',
    profile: 'حسابي',
    wishlist: 'المفضلة',
    bookNow: 'احجز الآن',
    perNight: 'في الليلة',
    rating: 'تقييم',
    reviews: 'تقييمات',
    checkIn: 'تسجيل الوصول',
    checkOut: 'تسجيل المغادرة',
    guests: 'الضيوف',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    addProperty: 'أضف عقارك',
    filters: 'فلترة',
    sort: 'ترتيب',
    seeAll: 'عرض الكل',
    nearby: 'قريب منك',
    trending: 'الأكثر طلباً',
    featured: 'مميز',
    loading: 'جاري التحميل...',
    noResults: 'لا توجد نتائج',
    ai: 'مساعد ذكي',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
  },
  fr: {
    search: 'Rechercher une destination...',
    explore: 'Explorer',
    home: 'Accueil',
    messages: 'Messages',
    profile: 'Profil',
    wishlist: 'Favoris',
    bookNow: 'Réserver',
    perNight: 'par nuit',
    rating: 'Note',
    reviews: 'Avis',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    guests: 'Voyageurs',
    login: 'Connexion',
    register: 'Inscription',
    addProperty: 'Ajouter propriété',
    filters: 'Filtres',
    sort: 'Trier',
    seeAll: 'Voir tout',
    nearby: 'À proximité',
    trending: 'Tendances',
    featured: 'En vedette',
    loading: 'Chargement...',
    noResults: 'Aucun résultat',
    ai: 'Assistant IA',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
  },
  en: {
    search: 'Search destinations...',
    explore: 'Explore',
    home: 'Home',
    messages: 'Messages',
    profile: 'Profile',
    wishlist: 'Wishlist',
    bookNow: 'Book Now',
    perNight: 'per night',
    rating: 'Rating',
    reviews: 'Reviews',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    login: 'Login',
    register: 'Register',
    addProperty: 'Add Property',
    filters: 'Filters',
    sort: 'Sort',
    seeAll: 'See All',
    nearby: 'Nearby',
    trending: 'Trending',
    featured: 'Featured',
    loading: 'Loading...',
    noResults: 'No results',
    ai: 'AI Assistant',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [direction, setDirection] = useState('rtl');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  };

  const t = (key) => translations[language]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, direction, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
