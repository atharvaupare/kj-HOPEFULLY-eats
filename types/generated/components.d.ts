import type { Schema, Attribute } from '@strapi/strapi';

export interface DisplayDisplay extends Schema.Component {
  collectionName: 'components_display_displays';
  info: {
    displayName: 'display';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    date: Attribute.Date;
  };
}

export interface DisplayDisplay1 extends Schema.Component {
  collectionName: 'components_display_display1s';
  info: {
    displayName: 'display1';
  };
  attributes: {};
}

export interface DisplayviewDisplayview extends Schema.Component {
  collectionName: 'components_displayview_displayviews';
  info: {
    displayName: 'displayview';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    date: Attribute.Date;
  };
}

export interface InfoInfo extends Schema.Component {
  collectionName: 'components_info_infos';
  info: {
    displayName: 'info';
  };
  attributes: {
    date: Attribute.Date;
    timings: Attribute.JSON;
    counsellername: Attribute.String;
    duration: Attribute.Decimal;
    price: Attribute.BigInteger;
  };
}

export interface MainMain extends Schema.Component {
  collectionName: 'components_main_mains';
  info: {
    displayName: 'main';
    description: '';
  };
  attributes: {
    profileimg: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    facilitator: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'display.display': DisplayDisplay;
      'display.display1': DisplayDisplay1;
      'displayview.displayview': DisplayviewDisplayview;
      'info.info': InfoInfo;
      'main.main': MainMain;
    }
  }
}
