/**
 * 
 * jquery.pjax.d.ts
 * 
 * @author falsandtru https://github.com/falsandtru/jquery.pjax.js/
 * @contributor NewNotMoon
 */

/// <reference path="jquery.d.ts"/>

interface PjaxSetting {
    area?: any       // string, array, function( event, param, origUrl, destUrl )
    link?: string
    filter?: any     // string, function()
    form?: string
    scope?: Object
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
    interval?: number
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
        sync?: boolean
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
            host: string //internal
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
        before?: (event?: JQueryEventObject, param?: any) => any
        after?: (event?: JQueryEventObject, param?: any) => any
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
            before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            rewrite?: {
                before?: (event: JQueryEventObject, param: any, cache: any) => any
                after?: (event: JQueryEventObject, param: any, cache: any) => any
            }
            cache?: {
                before?: (event?: JQueryEventObject, param?: any, cache?: any) => any
                after?: (event?: JQueryEventObject, param?: any, cache?: any) => any
            }
            redirect?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            url?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
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
            scroll?: {
                before?: (event?: JQueryEventObject, param?: any) => any
                after?: (event?: JQueryEventObject, param?: any) => any
            }
            css?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            script?: {
                before?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
                after?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            }
            render?: {
                before?: (event?: JQueryEventObject, param?: any) => any
                after?: (event?: JQueryEventObject, param?: any) => any
            }
            verify?: {
                before?: (event?: JQueryEventObject, param?: any) => any
                after?: (event?: JQueryEventObject, param?: any) => any
            }
            balance?: {
              before?: (event?: JQueryEventObject, param?: any) => any
              after?: (event?: JQueryEventObject, param?: any) => any
            }
            success?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            error?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            complete?: (event?: JQueryEventObject, param?: any, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
        }
    }
}
interface PjaxCache {
    data: string
    textStatus: string
    jqXHR: JQueryXHR
    expires: number
}

interface JQueryPjax {
    (setting?: PjaxSetting): JQueryPjax
    enable(): JQueryPjax
    disable(): JQueryPjax
    click(): JQueryPjax
    click(url: string, attr?: { href?: string; }): JQueryPjax
    click(url: HTMLAnchorElement, attr?: { href?: string; }): JQueryPjax
    click(url: JQuery, attr?: { href?: string; }): JQueryPjax
    submit(): JQueryPjax
    submit(url: string, attr: { action?: string; method?: string; }, data: any): JQueryPjax
    submit(url: HTMLFormElement, attr?: { action?: string; method?: string; }, data?: any): JQueryPjax
    submit(url: JQuery, attr?: { action?: string; method?: string; }, data?: any): JQueryPjax
    follow(event: JQueryEventObject, ajax: JQueryXHR, host?: string): boolean
    setCache(): JQueryPjax
    setCache(url: string): JQueryPjax
    setCache(url: string, data: string): JQueryPjax
    setCache(url: string, data: string, textStatus: string, jqXHR: JQueryXHR): JQueryPjax
    getCache(): PjaxCache
    getCache(url: string): PjaxCache
    removeCache(url: string): JQueryPjax
    removeCache(): JQueryPjax
    clearCache(): JQueryPjax
    host(): string
    
    end(): JQuery
}

interface JQueryStatic {
    pjax: JQueryPjax
}

interface JQuery {
    pjax: JQueryPjax
}
