import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ModalController } from 'ionic-angular';

import {Itunes} from '../../providers/itunes';

@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [Itunes]
})

export class SearchPage {
  keyword: string = '';
  results: any = [];
  _unfilteredResults: any = [];
  usesFilter: Boolean = false;

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private itunes: Itunes) {

  }

  // Refresher function
  reloadData(refresher) {
    this.results = [];
    this.itunes.search(this.keyword)
      .then(results => {
        refresher.complete();
        this.results = results;
      });
  }
  // Cancel Search
  onSearchClear(e) {
    console.debug('User pressed cancel');
  }
  // Enter Search
  onSearchPressed(e) {
    if (this.keyword === '') {
      let alert = this.alertCtrl.create({
        title: 'Empty search not allowed',
        subTitle: 'Please key in your search',
        buttons: [
          'Cancel',
          {
            text: 'Search...',
            handler: data => {
              if (data.term) {
                this.keyword = data.term;
                this.search();
              } else {
                return false;
              }
            }
          }
        ],
        inputs: [
          {
            name: 'term',
            placeholder: 'Search for..'
          }

        ]
      });
      alert.present();
      return;
    }
    this.search();
  }

  // search by keyword
  search() {
    // ProgressIndicator.showSimple();
    this.itunes.search(this.keyword)
      .then((results) => {
        if (!results.length) {
          let alert = this.alertCtrl.create({
            title: 'The iTunes API says...',
            subTitle: 'No match found',
            buttons: ['I\'ll try again']
          });
          alert.present();
        }
        this.results = results;
        this._unfilteredResults = results;
        this.usesFilter = false;
      });
  }

  // Filter Window
  openFilters() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filter by..',
      buttons: [
        {
          text: 'Movies only',
          handler: () => {
            this.results = this._unfilteredResults.filter(
              (item) => item.kind === 'feature-movie'
            );
            this.usesFilter = true;
          }
        },

        {
          text: 'Songs only',
          handler: () => {
            this.results = this._unfilteredResults.filter(
              (item) => item.kind === 'song'
            );
            this.usesFilter = true;
          }
        },

        {
          text: 'Clear',
          style: 'destructive',
          handler: () => {
            this.results = this._unfilteredResults;
            this.usesFilter = false;
          }
        },

        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }


}
