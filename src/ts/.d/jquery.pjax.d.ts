/**
 * 
 * jquery.pjax.d.ts
 * 
 * @author falsandtru https://github.com/falsandtru/jquery-pjax
 * @contributor NewNotMoon
 */

/// <reference path="jquery.d.ts"/>

interface JQuery {
    pjax: JQueryPjaxStatic
}

interface JQueryStatic {
    pjax: JQueryPjaxStatic
}

interface PjaxSetting {
    area?: string | string[]
    link?: string
    filter?: string | ((index?: number, element?: HTMLAnchorElement) => boolean)
    form?: string
    replace?: string | ((index?: number, element?: HTMLAnchorElement) => boolean)
    scope?: {
        [index: string]: any
        rewrite?(url: string): string
    }
    rewrite?: (document: Document, area?: string, host?: string) => void
    state?: ((event?: JQueryEventObject, setting?: PjaxSetting, origLocation?: HTMLAnchorElement, destLocation?: HTMLAnchorElement) => any) | any
    scrollTop?: number | boolean | ((event?: JQueryEventObject, setting?: PjaxSetting, origLocation?: HTMLAnchorElement, destLocation?: HTMLAnchorElement) => number | boolean)
    scrollLeft?: number | boolean | ((event?: JQueryEventObject, setting?: PjaxSetting, origLocation?: HTMLAnchorElement, destLocation?: HTMLAnchorElement) => number | boolean)
    ajax?: JQueryAjaxSettings
    contentType?: string
    redirect?: boolean
    cache?: {
        click?: boolean
        submit?: boolean
        popstate?: boolean
        get?: boolean
        post?: boolean
        limit?: number
        mix?: number
        expires?: {
            min?: number
            max?: number
        }
    }
    buffer?: {
      limit?: number
      delay?: number
    }
    load?: {
        head?: string
        css?: boolean
        script?: boolean
        ignore?: string
        reload?: string
        log?: string
        error?: boolean | ((error?: Error, element?: HTMLScriptElement) => any)
        ajax?: JQueryAjaxSettings
    }
    balance?: {
        active?: boolean
        bounds?: string[]
        weight?: number
        random?: number
        option?: PjaxSetting
        client?: {
            hosts?: string[]
            support?: {
                browser?: RegExp
                redirect?: RegExp
            }
            cookie?: {
                balance?: string
                redirect?: string
                host?: string
            }
        }
        server?: {
            header?: string
            respite?: number
            expires?: number
        }
    }
    wait?: number | ((event?: JQueryEventObject, setting?: PjaxSetting, origLocation?: HTMLAnchorElement, destLocation?: HTMLAnchorElement) => number)
    fallback?: boolean | ((event?: JQueryEventObject, setting?: PjaxSetting, origLocation?: HTMLAnchorElement, destLocation?: HTMLAnchorElement) => void | boolean)
    reset?: {
        type?: string
        count?: number
        time?: number
    }
    fix?: {
        location?: boolean
        history?: boolean
        scroll?: boolean
        noscript?: boolean
        reference?: boolean
    }
    database?: {
        active?: boolean
        revision?: number
        refresh?: number
    }
    server?: {
        query?: string|{}
        header?: {
            area?: boolean
            head?: boolean
            css?: boolean
            script?: boolean
        }
    }
    overlay?: string
    data?: any
    callback?: (event?: JQueryEventObject, setting?: PjaxSetting) => any
    callbacks?: {
        ajax?: {
            xhr?: (event?: JQueryEventObject, setting?: PjaxSetting) => JQueryXHR
            beforeSend?: (event?: JQueryEventObject, setting?: PjaxSetting, data?: string, ajaxSettings?: any) => any
            dataFilter?: (event?: JQueryEventObject, setting?: PjaxSetting, data?: string, dataType?: any) => string
            success?: (event?: JQueryEventObject, setting?: PjaxSetting, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            error?: (event?: JQueryEventObject, setting?: PjaxSetting, jqXHR?: JQueryXHR, textStatus?: string, errorThrown?: any) => any
            complete?: (event?: JQueryEventObject, setting?: PjaxSetting, jqXHR?: JQueryXHR, textStatus?: string) => any
        }
        update?: {
            redirect?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting, redirectLocation?: HTMLAnchorElement, origLocation?: HTMLAnchorElement, destLocation?: HTMLAnchorElement) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting, redirectLocation?: HTMLAnchorElement, origLocation?: HTMLAnchorElement, destLocation?: HTMLAnchorElement) => boolean
            }
            url?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting, origLocation?: HTMLAnchorElement, destLocation?: HTMLAnchorElement) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting, origLocation?: HTMLAnchorElement, destLocation?: HTMLAnchorElement) => boolean
            }
            rewrite?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting, srcDocument?: Document, dstDocument?: Document) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting, srcDocument?: Document, dstDocument?: Document) => boolean
            }
            title?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting, srcTitle?: string, dstTitle?: string) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting, srcTitle?: string, dstTitle?: string) => boolean
            }
            head?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting, srcHead?: HTMLHeadElement, dstHead?: HTMLHeadElement) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting, srcHead?: HTMLHeadElement, dstHead?: HTMLHeadElement) => boolean
            }
            content?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting, srcContent?: HTMLElement[], dstContent?: HTMLElement[]) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting, srcContent?: HTMLElement[], dstContent?: HTMLElement[]) => boolean
            }
            balance?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting, host?: string, loadtime?: number, size?: number) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting, host?: string, loadtime?: number, size?: number) => boolean
            }
            css?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting, srcCSS?: HTMLElement[], dstCSS?: HTMLElement[]) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting, srcCSS?: HTMLElement[], dstCSS?: HTMLElement[]) => boolean
            }
            script?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting, srcScript?: HTMLElement[], dstScript?: HTMLElement[]) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting, srcScript?: HTMLElement[], dstScript?: HTMLElement[]) => boolean
            }
            scroll?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
        }
    }
}

interface PjaxCache {
    data: string
    textStatus: string
    jqXHR: JQueryXHR
    expires: number
}

interface JQueryPjax extends PJAX.Core<JQueryPjax>, PJAX.Method<JQueryPjax>, JQuery {
    click(): JQueryPjax
    click(url: string, attrs?: {}): JQueryPjax
    click(url: HTMLAnchorElement): JQueryPjax
    click(url: JQuery): JQueryPjax
    submit(): JQueryPjax
    submit(url: string, attrs: {}, data: {} | {}[]): JQueryPjax
    submit(url: HTMLFormElement): JQueryPjax
    submit(url: JQuery): JQueryPjax
}

interface JQueryPjaxStatic extends PJAX.Core<JQueryPjax>, PJAX.Method<JQueryPjaxStatic>, JQueryStatic {
}

declare module PJAX {
    
    interface Core<T> {
        (): T
        (setting: PjaxSetting): T
    }
    
    interface Method<T> {
        enable(): T
        disable(): T
        click(): T
        click(url: string, attrs?: {}): T
        click(url: HTMLAnchorElement): T
        click(url: JQuery): T
        submit(): T
        submit(url: string, attrs: {}, data: {} | {}[]): T
        submit(url: HTMLFormElement): T
        submit(url: JQuery): T
        setCache(): T
        setCache(url: string): T
        setCache(url: string, data: string): T
        setCache(url: string, data: string, textStatus: string, jqXHR: JQueryXHR): T
        getCache(): PjaxCache
        getCache(url: string): PjaxCache
        removeCache(url: string): T
        removeCache(): T
        clearCache(): T
        follow(event: JQueryEventObject, ajax: JQueryXHR, host?: string): boolean
        bypass(): JQueryDeferred<any>
        host(): string
    }
}
