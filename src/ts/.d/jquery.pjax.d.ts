/**
 * 
 * jquery.pjax.d.ts
 * 
 * @author falsandtru https://github.com/falsandtru/jquery.pjax.js/
 * @contributor NewNotMoon
 */

/// <reference path="jquery.d.ts"/>

interface JQueryStatic {
  pjax: JQueryPjaxStatic
}

interface JQuery {
  pjax: JQueryPjax
}

interface PjaxSetting {
    area?: any       // string, array, function( event, param, origUrl, destUrl )
    link?: string
    filter?: any     // string, function()
    form?: string
    scope?: {
        [index: string]: any
        rewrite(url: string): string
    }
    rewrite: (document: Document, area: string, host: string) => void
    state?: any      // any, function(event, param, origUrl, destUrl )
    scrollTop?: any  // number, function( event, param, origUrl, destUrl ), null, false
    scrollLeft?: any // number, function( event, param, origUrl, destUrl ), null, false
    scroll?: {
        delay?: number
    }
    ajax?: JQueryAjaxSettings
    contentType?: string
    redirect?: boolean
    cache?: {
        click?: boolean
        submit?: boolean
        popstate?: boolean
        get?: boolean
        post?: boolean
        page?: boolean
        size?: number
        mix?: number
        expires?: {
            min?: number
            max?: number
        }
    }
    buffer: {
      limit: number
      delay: number
    }
    load?: {
        head?: string
        css?: boolean
        script?: boolean
        execute?: boolean
        reload?: string
        ignore?: string
        ajax?: JQueryAjaxSettings
    }
    balance: {
        self: boolean
        weight: number
        client: {
            support: {
                userAgent: RegExp
                redirect: RegExp
            }
            exclude: RegExp
            cookie: {
                balance: string
                redirect: string
                host: string
            }
        }
        server: {
            header: string
            filter: RegExp
            error: number
        }
        log: {
            expires: number
            limit: number
        }
        option: PjaxSetting
    }
    wait?: any     // number, function( event, param, origUrl, destUrl ): number
    fallback?: any // boolean, function( event, param, origUrl, destUrl ): boolean
    fix?: {
        location?: boolean
        history?: boolean
        scroll?: boolean
        noscript?: boolean
        reset?: boolean
    }
    database?: boolean
    server?: {
        query?: any // string, object
        header?: {
            area?: boolean
            head?: boolean
            css?: boolean
            script?: boolean
        }
    }
    callback?: (event?: JQueryEventObject, param?: any) => any
    param?: any
    callbacks?: {
        ajax?: {
            xhr?: (event?: JQueryEventObject, param?: any) => any
            beforeSend?: (event?: JQueryEventObject, param?: any, data?: string, ajaxSettings?: any) => any
            dataFilter?: (event?: JQueryEventObject, param?: any, data?: string, dataType?: any) => any
            success?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            error?: (event?: JQueryEventObject, param?: any, jqXHR?: JQueryXHR, textStatus?: string, errorThrown?: any) => any
            complete?: (event?: JQueryEventObject, param?: any, jqXHR?: JQueryXHR, textStatus?: string) => any
            done?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            fail?: (event?: JQueryEventObject, param?: any, jqXHR?: JQueryXHR, textStatus?: string, errorThrown?: any) => any
            always?: (event?: JQueryEventObject, param?: any, jqXHR?: JQueryXHR, textStatus?: string) => any
        }
        update?: {
            redirect?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            url?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            rewrite?: {
                before?: (event: JQueryEventObject, param: any, cache: any) => any
                after?: (event: JQueryEventObject, param: any, cache: any) => any
            }
            title?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            head?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            content?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            css?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            script?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            scroll?: {
                before?: (event?: JQueryEventObject, param?: any) => any
                after?: (event?: JQueryEventObject, param?: any) => any
            }
            balance?: {
              before?: (event?: JQueryEventObject, param?: any) => any
              after?: (event?: JQueryEventObject, param?: any) => any
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

interface Pjax<T> {
    (setting?: PjaxSetting): JQueryPjax
    enable(): T
    disable(): T
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
    host(): string
}

interface JQueryPjaxStatic extends Pjax<JQueryPjaxStatic>, JQueryStatic {
    click(): JQueryPjaxStatic
    click(url: string, attrs?: {}): JQueryPjaxStatic
    click(url: HTMLAnchorElement): JQueryPjaxStatic
    click(url: JQuery): JQueryPjaxStatic
    submit(): JQueryPjaxStatic
    submit(url: string, attrs: {}, data: any): JQueryPjaxStatic
    submit(url: HTMLFormElement): JQueryPjaxStatic
    submit(url: JQuery): JQueryPjaxStatic
}

interface JQueryPjax extends Pjax<JQueryPjax>, JQuery {
    click(): JQueryPjax
    click(url: string, attrs?: {}): JQueryPjax
    click(url: HTMLAnchorElement): JQueryPjax
    click(url: JQuery): JQueryPjax
    submit(): JQueryPjax
    submit(url: string, attrs: {}, data: any): JQueryPjax
    submit(url: HTMLFormElement): JQueryPjax
    submit(url: JQuery): JQueryPjax
}
