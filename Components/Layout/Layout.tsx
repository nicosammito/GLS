import { getProperties } from 'properties-file'
import useSWR from "swr";
import {Context, createContext, FunctionComponent, ReactNode, useContext} from "react";
import {useRouter} from "next/router";

interface LayoutProps {
    children: ReactNode
    footer?: boolean
}

const myHeaders = new Headers();
myHeaders.append('Content-Type','text/plain; charset=UTF-8');

const Language:Context<{}> = createContext({})
// @ts-ignore
const fetcher = (...args) => fetch(...args, myHeaders).then(res => res.text())

export const useLanguage = (): {[key: string]: string} => {
    return useContext(Language);
}
export const useLanguageTranslation = (key: string): string => {
    return useLanguage()[key]
}

export const useLanguageTranslations = (key: string): string[] => {
    const result = [];
    for (let i = 1; useLanguage()[key + "." + i]; i++) {
        result.push(useLanguage()[key + "." + i]);
    }
    return result;
}

const Layout: FunctionComponent<LayoutProps> = (props) => {

    const {children, footer = true} = props;
    const locale = useRouter().locale;
    const { data, error } = useSWR(`${__dirname}./Language/Language_${locale}.properties`, fetcher);

    if (!data) return <main>Loading...</main>
    if (error) return <main>Failed to load...</main>

    const languageProperties = getProperties(data)


    return <Language.Provider value={languageProperties}>
        {children}
    </Language.Provider>

}

export default Layout;