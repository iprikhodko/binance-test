// now all colors are put into css variables, in case we will want to change this approach, I put css variables into this object
const COLORS = {
  BACKGROUND_PRIMARY: 'var(--background-primary)',
  BACKGROUND_SECONDARY: 'var(--background-secondary)',
  BACKGROUND_THIRD: 'var(--background-third)',

  TEXT_PRIMARY: 'var(--text-primary)',
  TEXT_SECONDARY: 'var(--text-secondary)',

  BORDER_PRIMARY: 'var(--border-primary)',
  BORDER_SECONDARY: 'var(--border-secondary)',
  BORDER_THIRD: 'var(--border-third)',

  ACTIVE_PRIMARY: 'var(--active-primary)',
  ACTIVE_SECONDARY: 'var(--active-secondary)',
  UP_PRIMARY: 'var(--up-primary)',
  DOWN_PRIMARY: 'var(--down-primary)',

  PLACEHOLDER_PRIMARY: 'var(--placeholder-primary)',
};

export default COLORS;
