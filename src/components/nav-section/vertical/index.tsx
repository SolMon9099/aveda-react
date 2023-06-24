// @mui
import { List, Box } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
//
import { NavSectionProps } from '../type';
import { ListSubheaderStyle } from './style';
import NavList from './NavList';
import Image from 'src/components/Image';
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

export default function NavSectionVertical({ navConfig, ...other }: NavSectionProps) {
  const { translate } = useLocales();
  const { user } = useAuth()

  return (
    <Box {...other}>
      {navConfig.map((group, idx) => (
          <List key={'SUBHEADER_'+idx} disablePadding sx={{ px: 2 }}>
            <ListSubheaderStyle>
              {translate(group.subheader)}
            </ListSubheaderStyle>

            {group.items.map((list, idx) => (
              <NavList
                key={list.title + list.path + idx}
                data={list}
                depth={1}
                hasChildren={!!list.children}
              />
            ))}

            {group.subheader === 'Comunidades' &&
              user?.communities.map((community: any, idx: number) =>
                <NavList
                  key={community.name + idx}
                  data={{path: `/forum/comunidade/${community._id}`, title: community.name, icon: <Image sx={{ width: 22, height: 22, borderRadius: 0.5 }} src={community.bannerImage} />}}
                  depth={1}
                  hasChildren={false}
                />
              )
            }
          </List>
        ))}
    </Box>
  );
}
