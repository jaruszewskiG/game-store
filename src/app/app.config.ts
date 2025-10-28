import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

/**
 * Application configuration
 *
 * Configures Angular app providers:
 * - Zoneless change detection for improved performance
 * - HTTP client for API requests
 * - Global error listeners for error handling
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
  ],
};
