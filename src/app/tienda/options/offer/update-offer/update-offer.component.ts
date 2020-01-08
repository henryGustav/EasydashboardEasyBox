import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {OfferService} from '../offer.service';
import {ToastrService} from 'toastr-ng2';

@Component({
    selector: 'app-update-offer',
    templateUrl: './update-offer.component.html',
    styleUrls: ['./update-offer.component.scss'],
    providers: [OfferService]
})
export class UpdateOfferComponent implements OnInit {
    pageTitle = 'Update Offer';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Offer',
            link: '/options/offer',
            icon: 'fa fa-ravelry'
        },
        {
            title: 'Update',
            link: '',
            icon: 'fa fa-pencil'
        }
    ];
    offers = {
        title: '',
        offerPercentage: '',
        offerAvilable: true
    };
    offerId: any;

    constructor(private _sharedService: SharedService,
                public router: Router,
                private route: ActivatedRoute,
                public offerService: OfferService,
                private toastrService: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.offerId = id;
                this.offerService.getOfferDetails(id)
                    .subscribe((response) => {
                            this.offers = response;
                        }
                    );
            });
    }

    onUpdateOffer(form: NgForm) {
        this.offerService.UpdateOfferData(this.offers, this.offerId).subscribe(res => {
            console.log('res');
            this.toastrService.success('Offer Updated Successfully!!!', 'Offer');
            this.router.navigate(['/options/offer']);
        });
    }

    cancel() {
        this.router.navigate(['/options/offer']);
    }
}
