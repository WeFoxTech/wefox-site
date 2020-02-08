import { FunctionComponent } from 'react';
import { List, ListItem } from '@material-ui/core';
import Link from '../src/Link';

const list = [
  ['/wip', 'wip'],
];

export const TopNav: FunctionComponent = () => {
  return (
    <List>
      {list.map((e, i) => (
        <ListItem key={i}>
          <Link href={e[0]}>{e[1]}</Link>
        </ListItem>
      ))}
    </List>
  );
};
