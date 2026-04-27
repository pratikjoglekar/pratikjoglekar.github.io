type ActionLinkProps = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export function ActionLink({ label, href, onClick }: ActionLinkProps) {
  const isExternal = href?.startsWith("http");

  const commonClasses = `
    underline underline-offset-4
    hover:opacity-70
    transition-opacity
    py-1 md:py-0
  `;

  // If onClick is provided → render button
  if (onClick) {
    return (
      <button onClick={onClick} className={commonClasses}>
        {label}
      </button>
    );
  }

  // Otherwise render link
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={commonClasses}
    >
      {label}
    </a>
  );
}
