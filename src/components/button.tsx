/**
 * The app's one button. Renders a <button> or, given `href`, an <a> that looks and
 * behaves identically, so a link that acts like a control is not styled by hand.
 *
 * The visual definitions live in globals.css (`.btn`, `.btn-primary`, …) alongside the
 * world map's own controls, which they were derived from. Keeping them there means the
 * map's CSS-defined buttons and these can't drift apart.
 */
type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  /** Square sign for one universally understood glyph, such as audio playback. */
  icon?: boolean;
  /** Wider and taller, for the one action that ends a slide. */
  wide?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type LinkProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "secondary", icon, wide, className, children, ...rest } = props;
  const classes = [
    "btn",
    `btn-${variant}`,
    icon ? "btn-icon" : "",
    wide ? "btn-wide" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { href: _href, ...buttonRest } = rest as Omit<ButtonProps, keyof CommonProps>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
