import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {OfferService} from './offer.service';
import {ToastrService} from 'toastr-ng2';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss'],
    providers: [OfferService]
})
export class OfferComponent implements OnInit {
    pageTitle = 'Offers';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Offer',
            link: '',
            icon: 'fa fa-ravelry'
        }
    ];
    offerData: any = [];

    constructor(private _sharedService: SharedService,
                public router: Router,
                public offerService: OfferService,
                private toastr: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
        this.offerService.getOfferData().subscribe(res => {
            this.offerData = res;
        });
    }

    addOffer() {
        this.router.navigate(['options/add-offer']);
    }

    editOffer(key) {
        this.router.navigate(['options/update-offer', key]);
    }

    onDeleteSize(key) {
        if (confirm('If you want to delete,Press OK button!') == true) {
            this.offerService.deleteOfferData(key)
                .subscribe((response) => {
                    this.toastr.info('Offer deleted...', 'Offer');
                    this.offerService.getOfferData()
                        .subscribe((response) => {
                            this.offerData = response;
                        });
                });
        }
    }
}
