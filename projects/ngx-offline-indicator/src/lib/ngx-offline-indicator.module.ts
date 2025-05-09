import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxOfflineIndicatorComponent } from './ngx-offline-indicator.component';
import { NgxOfflineIndicatorService } from './ngx-offline-indicator.service';
import { NgxOfflineIndicatorConfigService } from './ngx-offline-indicator-config.service';
import { OfflineIndicatorConfig } from './ngx-offline-indicator.models';

@NgModule({
  imports: [
    CommonModule,
    NgxOfflineIndicatorComponent
  ],
  exports: [
    NgxOfflineIndicatorComponent
  ],
  providers: [
    NgxOfflineIndicatorService,
    NgxOfflineIndicatorConfigService
  ]
})
export class NgxOfflineIndicatorModule {
  /**
   * Use this method to provide global configuration for the offline indicator
   * @param config The configuration object
   * @returns Module with providers
   */
  static forRoot(config: Partial<OfflineIndicatorConfig> = {}): ModuleWithProviders<NgxOfflineIndicatorModule> {
    return {
      ngModule: NgxOfflineIndicatorModule,
      providers: [
        {
          provide: 'NGX_OFFLINE_INDICATOR_CONFIG',
          useValue: config
        },
        {
          provide: NgxOfflineIndicatorConfigService,
          useFactory: () => {
            const service = new NgxOfflineIndicatorConfigService();
            service.setConfig(config);
            return service;
          }
        }
      ]
    };
  }
}
