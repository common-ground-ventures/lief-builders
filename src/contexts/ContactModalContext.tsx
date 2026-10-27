import { createContext, useContext, useState, type ReactNode } from "react";

// "builder" opens the builder sign-up version of the same form.
export type ContactModalMode = "contact" | "builder";

interface ContactModalContextType {
  isOpen: boolean;
  mode: ContactModalMode;
  openModal: (mode?: unknown) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType>({
  isOpen: false,
  mode: "contact",
  openModal: () => {},
  closeModal: () => {},
});

export const useContactModal = () => useContext(ContactModalContext);

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ContactModalMode>("contact");

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        mode,
        // onClick handlers pass the click event, so only the literal "builder" switches modes.
        openModal: (m?: unknown) => {
          setMode(m === "builder" ? "builder" : "contact");
          setIsOpen(true);
        },
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
};
