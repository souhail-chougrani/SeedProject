import { AppState } from '../core.state';

export interface AuthState extends AppState {
  isAuthenticated: boolean;
}
