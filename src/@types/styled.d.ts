import 'styled-components';
// types
import type { ThemeVariables } from 'sjds/types/Palette';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeVariables {}
}
