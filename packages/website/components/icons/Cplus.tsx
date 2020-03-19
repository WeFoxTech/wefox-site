import { SvgIcon } from '@material-ui/core';

export const CplusIcon: React.FC = props => {
  return (
    <SvgIcon viewBox="0 0 1024 1024" {...props}>
      <path
        d="M128 0C57.77 0 0 57.77 0 128v384h85.333V128c0-23.979 18.688-42.667 42.667-42.667h768c23.979 0 42.667 18.688 42.667 42.667v384H1024V128c0-70.23-57.77-128-128-128H128zm0 597.333c-70.23 0-128 57.771-128 128V896c0 70.23 57.77 128 128 128s128-57.77 128-128h-85.333c0 23.979-18.688 42.667-42.667 42.667A42.07 42.07 0 0185.333 896V725.333c0-23.978 18.688-42.666 42.667-42.666s42.667 18.688 42.667 42.666H256c0-70.229-57.77-128-128-128zm298.667 85.334V768h-85.334v85.333h85.334v85.334H512v-85.334h85.333V768H512v-85.333h-85.333zm341.333 0V768h-85.333v85.333H768v85.334h85.333v-85.334h85.334V768h-85.334v-85.333H768z"
        fill="#949AA3"
      />
    </SvgIcon>
  );
};