export class password {
  oldPassword: string;
  newPassword: string;
}

export class Brand {
  _id?: number;
  codigo?: string;
  title: string;
  estado: number;
}

export class Favourite {
  _id?: number;
  product: string;
}

export class WishlistCheck {
  _id?: number;
  product: string;
}

export class checkFavourite {
  _id?: number;
  product: string;
}

export class FavouriteDelete {
  _id?: number;
  product: string;
}

export class Order {
  _id?: number;
  productDetails: Product[];
  status = 'PENDING';
  categoryName: string;
  grandTotal:  number;
   number: true;
  user:  number;
  timestamp:  number;
  estado: number;
}

export class Category {
  _id?: number;
  codigo?: string;
  title: string;
  imageUrl: string;
  shortDescription: string;
  estado: number;
  subCategory?: SubCategories[];
  createdAt?: string;
}

export class Tienda {
  _id?: number;
  codigo?: string;
  ruc: string;
  title: string;
  imageUrl: string;
  shortDescription: string;
  estado: number;
  telefono: string;
  celular: string;
  email: string;
}

export class ProductRatings {
  _id?: number;
  user: string;
  category: string;
  order: string;
  product: string;
  rating:  number;
  comment: string;
}

export class Variant {
  _id?: number;
  product:  number;
  color: string;
  size: string;
  price: string;
  stockSize: string;
  imageUrl: string;
  enable: boolean;
  default: true;
  sku: string;
  estado: number;
  // thumbnail: []
}

export class Coupon {
  _id?: number;
  title: string;
  couponPercentage: string;
  shortDescription: string;
  estado: number;
}

export class Offer {
  _id?: number;
  title: string;
  offerAvilable: boolean;
  offerPercentage:  number;
  estado: number;
}

export class Product {
  _id?: number;
  codigo?: string;
  idTienda: number;
  title: string;
  categoryId:  number;
  subCategoryId:  number;
  brandId:  number;
  color: ProductColors;
  sizecolors?: Variant[];
  description: string;
  shortDescription: string;
  imageUrl: string;
  stockSize:  number;
  isFeatured: boolean;
  price:  number;
  sale: boolean;
  size: ProductSize;
  new: boolean;
  active: boolean;
  thumbnail: any[];
  estado: number;
  unityId?: number;
}

export class ProductColors {
  _id?: number;
  codigo?: string;
  title: string;
  colorCode: string;
  estado: number;
}

export class stripeAddCard {
  _id?: number;
  month: string;
  year: string;
  cardNumber:  number;
}

export class stripePayment {
  _id?: number;
  customerId: string;
  amount:  number;
}

export class ProductSize {
  _id?: number;
  title: string;
  codigo?: string;
  sizeShortName: string;
  estado?: number;
  unityId?: number;
  constructor(){
    // tslint:disable-next-line:curly
    if (! this.estado )
      this.estado = 1;
  }
}

export class ProductSortingBySize {
  size: string;
  id: string;
}

export class SubCategories {
  _id?: number;
  categoryId: string;
  codigo?: string;
  title: string;
  estado?: number;
}

export class Cart {
  _id?: number;
  cartItems: Product[];
}

export class Wishlist {
  _id?: number;
  user: string;
  productId: string;
}

export class ProductSorting {
  _id?: number;
  categoryId: string;
  subCategoryId: string;
  title: string;
}

export class User {
  _id?: number;
  name?: string;
  nombre: string;
  apellido: string;
  identificacion: string;
  address: Address;
  email: string;
  birthDate: string;
  gender: string;
  id_role:  number;
  role: string;
  imageUrl: string;
  password?: string;
  thumbnail?: any[];
}

export class Address {
  _id?: number;
  user:  number;
  homeNumber:  number;
  apartmentName: string;
//  landmark: string;
  city: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  pincode:  number;
  principal_street: string;
  secondary_street: string;
  contactNumber: string;
  celularNumber: string;
  primaryAddress = false;
}

export class Carddetail {
  _id?: number;
  user:  number;
  card: string;
  cardType: string;
  cardNumber:  number;
  cardHolderName: string;
  expiryMonth:  number;
  expiryYear:  number;
  primaryCard: boolean;
  default: false;
  cardCvv:  number;
}

export class ApiResponse {
  code:  number;
  type: string;
  message: string;
}

export class Rol{
  _id: number;
  nombre: string;
  porcentaje: number;
}
