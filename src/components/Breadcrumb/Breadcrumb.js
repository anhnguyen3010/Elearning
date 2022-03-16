import React from 'react'
import { withRouter } from 'react-router'
import { Link } from "react-router-dom";
import { StyledBreadCrumbs } from 'src/styles/customize';

const Breadcrumb = props => {
    const { history, location: { pathname } } = props;
    // const { pathname } = location;
    // console.log(pathname);
    const pathnames = pathname.split("/").filter(x => x);
    // console.log(pathnames);
    return (
        <StyledBreadCrumbs >
            <Link onClick={() => history.push("/")}>Home</Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
                // console.log(name);
                // console.log(index);
                // console.log(routeTo);
                const isLast = index === pathnames.length - 1;
                return isLast ? <i key={name}>{name}</i> : (<Link key={name} onClick={() => history.push(routeTo)}>{name}</Link>)
            })}
        </StyledBreadCrumbs>
    )
}

export default withRouter(Breadcrumb)
