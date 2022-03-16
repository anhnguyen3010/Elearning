import styled from 'styled-components';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import { Breadcrumbs as Breadcrumbs} from '@material-ui/core'
//Customize Material UI components

export const StyledPopper = styled(Popper)`
    top:0 !important;
    left:0 !important;
    transform:none !important;
    z-index:999;
`

export const StyledGrow = styled(Grow)`
    margin:0;
    min-height:100vh;
    height:auto;
    width: ${({ search }) => (search ? "100vw" : "40vw")};
    max-height:100%;
    max-width: 100%;
    
`

export const StyledMenuList = styled(MenuList)`
    li{
        font-size: 1.4rem;
        padding: 1.6rem 1.4rem;
        color:#868282;
        a{
            display:flex;
            justify-content:space-between;
            color:#868282;
            &:hover {
                color:#0f7c90;
            }
        }
    }
    .ude-user{
        background: #a8ccc0;
        margin:1rem 0;
        a{
            font-size:1.6rem;
            color:#fff;
        }
    }
    .authen{
        color:#ec5252;
    }

    .search-page{
        color:#868282;
        display:flex;
        justify-content:flex-start;
        align-items:center;
        border: 1px solid #e0dfd9;
        padding: 0 2rem;
        
        input{
            flex:1;
            padding: 1.6rem;
            border:none;
        }
        ul{
            overflow: hidden;
            overflow-y: none;
        }
    }
`

export const StyledBreadCrumbs = styled(Breadcrumbs)`
    font-size:1.6rem;
    margin: 2rem 0;
    color:#868282;
    font-weight:600;

`

