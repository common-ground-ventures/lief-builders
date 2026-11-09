import { createContext, useContext, useRef, useState, type ReactNode } from "react";

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
  const returnFocus = useRef<HTMLElement | null>(null);

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        mode,
        // onClick handlers pass the click event, so only the literal "builder" switches modes.
        openModal: (m?: unknown) => {
          const active = document.activeElement;
          returnFocus.current = active instanceof HTMLElement
            ? (active.closest(".v2-menu-link")
              ? document.querySelector<HTMLButtonElement>('header button[aria-label="Close menu"]')
              : active)
            : null;
          setMode(m === "builder" ? "builder" : "contact");
          setIsOpen(true);
        },
        closeModal: () => {
          setIsOpen(false);
          requestAnimationFrame(() => {
            if (returnFocus.current?.isConnected) returnFocus.current.focus();
          });
        },
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
};
