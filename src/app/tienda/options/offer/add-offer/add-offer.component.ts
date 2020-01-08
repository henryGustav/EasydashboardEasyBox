import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {OfferService} from '../offer.service';
import {ToastrService} from 'toastr-ng2';

@Component({
    selector: 'app-add-offer',
    templateUrl: './add-offer.component.html',
    styleUrls: ['./add-offer.component.scss'],
    providers: [OfferService]
})
export class AddOfferComponent implements OnInit {
    pageTitle = 'Add Offer';
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
            title: 'Add',
            link: '',
            icon: 'fa fa-plus'
        }
    ];
    offers = {
        title: '',
        offerPercentage: '',
        offerAvilable: true
    };

    constructor(private _sharedService: SharedService,
                public router: Router,
                public offerService: OfferService,
                private toastrService: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
    }

    onSaveOffer(form: NgForm) {
        this.offerService.saveOfferData(this.offers).subscribe(res => {
            this.toastrService.success('Offer Added Successfully!!!', 'Offer');
            this.router.navigate(['/options/offer']);
        });
    }

    cancel() {
        this.router.navigate(['/options/offer']);
    }
}
