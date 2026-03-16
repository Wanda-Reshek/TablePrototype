import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  onClick,
  ...rest
}) {
  const className = [
    styles.button,
    styles[variant],
    styles[size],
  ].join(' ');

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {/* inner keeps content above the ::before gradient overlay */}
      <span className={styles.inner}>
        {icon && <span className={styles.iconWrap}>{icon}</span>}
        {children}
      </span>
    </button>
  );
}
