import { Injectable, Inject } from '@angular/core';
import {DOCUMENT } from '@angular/common';

import * as Color from 'color';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: Storage
  ){
    storage.get('theme').then(cssText => {
      this.setGlobalCSS(cssText);
    });
    
  }

  setTheme(theme) {
    const cssText = CSSTextGenerator(theme);
    this.setGlobalCSS(cssText);
    this.storage.set('theme', cssText);
  }
  
  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText= css;
  }

}

const defaults = {
  primary: '#3880ff',
  secondary: '#595959',
  tertiary: '#7044ff',
  success: '#10dc60',
  warning: '#ffce99',
  danger: '#f04141',
  dark: '#222428',
  medium: '#989aa2',
  light: '#f4f5f8'
};


function contrast (color, ratio = 0.8) {
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);

}

function CSSTextGenerator(colors){
  colors = {...defaults, ...colors };

  const { primary, secondary, tertiary, success, warning, danger, dark, medium, light } = colors;

  const shadeRatio = 0.1;
  const tintRatio = 0.1;

  return `--ion-color-base: ${light};
  --ion-color-contrast: ${dark};
  --ion-background-color: ${light};
  --ion-text-color: ${dark};
  --ion-toolbar-background-color: ${contrast(light, 0.1)};
  --ion-toolbar-text-color: ${contrast(dark, 0.1)};

  --ion-color-primary: ${primary};
  --ion-color-primary-rgb: 56,128,255;
  --ion-primary-contrast: ${contrast(primary)};
  --ion-color-primary-contrast-rgb: 255,255,255;
  --ion-color-primary-shade: ${Color(primary).darken(shadeRatio)};
  --ion-color-primary-tint: ${Color(primary).lighten(tintRatio)};

  --ion-color-secondary: ${secondary};
  --ion-color-secondary-rgb: 12,209,232;
  --ion-secondary-contrast: ${contrast(secondary)};
  --ion-color-secondary-contrast-rgb: 255,255,255;
  --ion-color-secondary-shade: ${Color(secondary).darken(shadeRatio)};
  --ion-color-secondary-tint: ${Color(secondary).lighten(tintRatio)};

  --ion-color-tertiary: ${tertiary};
  --ion-color-tertiary-rgb: 112,68,255;
  --ion-tertiary-contrast: ${contrast(tertiary)};
  --ion-color-tertiary-contrast-rgb: 255,255,255;
  --ion-color-tertiary-shade: ${Color(tertiary).darken(shadeRatio)};
  --ion-color-tertiary-tint: ${Color(tertiary).lighten(tintRatio)};

  --ion-color-success: ${success};
  --ion-color-success-rgb: 16,220,96;
  --ion-success-contrast: ${contrast(success)};
  --ion-color-success-contrast-rgb: 255,255,255;
  --ion-color-success-shade: ${Color(success).darken(shadeRatio)};
  --ion-color-success-tint: ${Color(success).lighten(tintRatio)};

  --ion-color-warning: ${warning};
  --ion-color-warning-rgb: 255,206,0;
  --ion-warning-contrast: ${contrast(warning)};
  --ion-color-warning-contrast-rgb: 255,255,255;
  --ion-color-warning-shade: ${Color(warning).darken(shadeRatio)};
  --ion-color-warning-tint: ${Color(warning).lighten(tintRatio)};

  --ion-color-dark: ${dark};
  --ion-color-dark-rgb: 34,34,34;
  --ion-dark-contrast: ${contrast(dark)};
  --ion-color-dark-contrast-rgb: 255,255,255;
  --ion-color-dark-shade: ${Color(dark).darken(shadeRatio)};
  --ion-color-dark-tint: ${Color(dark).lighten(tintRatio)};

  --ion-color-medium: ${medium};
  --ion-color-medium-rgb: 125,154,162;
  --ion-medium-contrast: ${contrast(medium)};
  --ion-color-medium-contrast-rgb: 255,255,255;
  --ion-color-medium-shade: ${Color(medium).darken(shadeRatio)};
  --ion-color-medium-tint: ${Color(medium).lighten(tintRatio)};

  --ion-color-light: ${light};
  --ion-color-light-rgb: 244,244,244;
  --ion-light-contrast: ${contrast(light)};
  --ion-color-light-contrast-rgb: 0,0,0;
  --ion-color-light-shade: ${Color(light).darken(shadeRatio)};
  --ion-color-light-tint: ${Color(light).lighten(tintRatio)};
  `;
}
