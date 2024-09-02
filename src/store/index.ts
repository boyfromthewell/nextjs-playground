import { create } from 'zustand';

type SelectedCountryType = {
  selectedCountry: string;
  setSelectedCountry: (key: string) => void;
};

export const selectedCountryStore = create<SelectedCountryType>((set) => ({
  selectedCountry: 'KR',
  setSelectedCountry: (code: string) => set(() => ({ selectedCountry: code })),
}));
