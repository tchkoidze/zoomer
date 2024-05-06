import FooterColumns from "./FooterColumns/FooterColumns";

export default function Footer() {
  return (
    <div className="w-full bg-white-400 dark:bg-dark-white-400 transition-colors duration-300 ease-in-out relative bottom-0 left-0">
      <FooterColumns />

      {<div className="custom-container py-[10px] pb-20 lg:pb-[10px]"></div>}
    </div>
  );
}
