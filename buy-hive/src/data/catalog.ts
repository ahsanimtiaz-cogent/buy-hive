import type { Product } from '../types/catalog'

const imageBase = 'https://tbh-production.s3.ap-southeast-1.amazonaws.com/Product'

const productRows = [
  ['Teakwood Outdoor Patio Sofa Furniture', '$ 125.00 - $ 6,900.00 / Set', '5 Sets', '1645385020/Images/163670064424262061.jpg'],
  ['Outdoor Aluminium Frame Furniture', '$ 615.70 - $ 762.50 / Set', '5 Sets', '104319170/Images/16376374001550894476.jpg'],
  ['Aluminium Sofa with Coffee Table', '$ 667.80 - $ 694.40 / Set', '5 Sets', '1097372935/Images/1637636954160800125.jpg'],
  ['Aluminium Outdoor Sofa', '$ 890.80 - $ 925.50 / Set', '5 Sets', '14512440/Images/163763654688980300.jpg'],
  ['Aluminium Frame Sofa Set', '$ 892.10 - $ 1,104.50 / Set', '5 Sets', '1077009789/Images/16376354131658955933.jpg'],
  ['Aluminium Frame Sofa', '$ 1,009.00 - $ 1,049.00 / Set', '5 Sets', '57326006/Images/16376348661184558908.jpg'],
  ['Leisure Outdoor Sofa', '$ 134.50 - $ 499.20 / Set', '5 Sets', '1121912299/Images/1637633847947788375.jpg'],
  ['Aluminum Garden Sofa', '$ 120.60 - $ 483.10 / Set', '5 Sets', '36954668/Images/16376322581246378711.jpg'],
  ['Garden Sofa Leisure Chair', '$ 59.00 - $ 156.50 / Set', '5 Sets', '1566854753/Images/1637574145175834214.jpg'],
  ['Rattan Park Seating Bench', '$ 179.00 - $ 188.10 / Unit', '5 Units', '483994266/Images/16375683361046886881.jpg'],
  ['Garden Hotel Bistro Home Sofa Set', '$ 125.00 - $ 131.50 / Unit', '5 Units', '1544419039/Images/16375673871213296195.jpg'],
  ['Outdoor Rope Dining Chair', '$ 155.00 - $ 162.90 / Unit', '5 Units', '526799632/Images/1637566256337520841.jpg'],
] as const

export const products: Product[] = productRows.map(([name, price, moq, image]) => ({
  name,
  price,
  moq,
  image: `${imageBase}/${image}`,
}))

export const productCertificates = ['FDA', 'Certificate of Conformity', 'CE', 'ASTM', 'GB', 'Certificate of Compliance', 'Intertek', 'ROHS', 'FCC', 'EN', 'EPA', 'ISO 11439:2000', 'SGS', 'Green Clean Certificate', 'ISO 11439:2013']
export const supplierCertificates = ['DUNS', 'DRS', 'ISO 13485', 'ISO 9001', 'ISO 9001:2015', 'GMP']
export const locations = ['Hong Kong S.A.R', 'India', 'China', 'Vietnam', 'United States', 'Canada', 'Australia', 'United Kingdom', 'Korea, Republic of']
