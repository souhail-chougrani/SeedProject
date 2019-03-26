export const nav: Nav[] = [
  { name: 'home', path: './home', children: [{ name: 'dash', path: './dash' }] }
];

export class Nav {
  name: string;
  path: string;
  children?: Nav[];
}
