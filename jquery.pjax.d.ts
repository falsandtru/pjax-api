/**
 * 
 * jquery.pjax.d.ts
 * 
 * type definitions file of jquery.pjax.js.
 * fork from falsandtru. https://github.com/falsandtru/jquery.pjax.js/
 * 
 * @author 新ゝ月 NewNotMoon
 * @copyright 2014, falsandtru 新ゝ月
 */
/*
    The MIT License (MIT)

    Copyright (c) 2012 falsandtru

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

interface PjaxSetting {
    gns?: string;
    ns?: string;
    area?: any; // string, array, function( event, param, origUrl, destUrl )
    link?: string;
    filter?: any; // string, function()
    form?: string;
    scope?: Object;
    state?: any; // any, function(event, param, origUrl, destUrl )
    scrollTop?: any; // number, function( event, param, origUrl, destUrl ), null, false
    scrollLeft?: any; // number, function( event, param, origUrl, destUrl ), null, false
    scroll?: {
        delay?: number;
        record?: boolean //internal
        queue?: number[] //internal
    };
    ajax?: JQueryAjaxSettings;
    contentType?: string;
    load?: {
        head?: boolean;
        css?: boolean;
        script?: boolean;
        execute?: boolean;
        reload?: string;
        ignore?: string;
        sync?: boolean;
        ajax?: JQueryAjaxSettings;
        rewrite?: (element: any) => any;
        redirect?: boolean;
    };
    interval?: number;
    cache?: {
        click?: boolean;
        submit?: boolean;
        popstate?: boolean;
        get?: boolean;
        post?: boolean;
        page?: boolean;
        size?: number;
        mix?: number;
        expires?: {
            min?: number;
            max?: number;
        };
    };
    wait?: any; // number, function( event, param, origUrl, destUrl ): number
    fallback?: any; // boolean, function( event, param, origUrl, destUrl ): boolean
    fix?: {
        location?: boolean;
        history?: boolean;
        scroll?: boolean;
        reset?: boolean;
    };
    database?: boolean;
    server?: {
        query?: any; // string, object
        header?: {
            area?: boolean;
            head?: boolean;
            css?: boolean;
            script?: boolean;
        };
    };
    callback?: (event: JQueryEventObject, param: any) => any;
    callbacks?: {
        before?: (event: JQueryEventObject, param: any) => any;
        after?: (event: JQueryEventObject, param: any) => any;
        ajax?: {
            xhr?: (event: JQueryEventObject, param: any) => any;
            beforeSend?: (event: JQueryEventObject, param: any, data: any, ajaxSettings: any) => any;
            dataFilter?: (event: JQueryEventObject, param: any, data: any, dataType: any) => any;
            success?: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            error?: (event: JQueryEventObject, param: any, XMLHttpRequest: XMLHttpRequest, textStatus: string, errorThrown: any) => any;
            complete?: (event: JQueryEventObject, param: any, XMLHttpRequest: XMLHttpRequest, textStatus: string) => any;
            done?: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            fail?: (event: JQueryEventObject, param: any, XMLHttpRequest: XMLHttpRequest, textStatus: string, errorThrown: any) => any;
            always?: (event: JQueryEventObject, param: any, XMLHttpRequest: XMLHttpRequest, textStatus: string) => any;
        };
        update?: {
            before?: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            after?: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            cache?: {
                before: (event: JQueryEventObject, param: any, cache: any) => any;
                after: (event: JQueryEventObject, param: any, cache: any) => any;
            };
            redirect?: {
                before: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
                after: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            };
            url?: {
                before: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
                after: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            };
            title?: {
                before: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
                after: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            };
            head?: {
                before: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
                after: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            };
            content?: {
                before: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
                after: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            };
            scroll?: {
                before: (event: JQueryEventObject, param: any) => any;
                after: (event: JQueryEventObject, param: any) => any;
            };
            css?: {
                before: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
                after: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            };
            script?: {
                before: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
                after: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            };
            render?: {
                before: (event: JQueryEventObject, param: any) => any;
                after: (event: JQueryEventObject, param: any) => any;
            };
            verify?: {
                before?: (event: JQueryEventObject, param: any) => any;
                after?: (event: JQueryEventObject, param: any) => any;
            };
            success?: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            error?: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
            complete?: (event: JQueryEventObject, param: any, data: any, textStatus: string, XMLHttpRequest: XMLHttpRequest) => any;
        };
        param?: any;

        // internal
        uuid?: string;
        nss?: {
            name?: string;
            event?: string[];
            click?: string;
            submit?: string;
            popstate?: string;
            scroll?: string;
            data?: string;
            class4html?: string;
            requestHeader?: string;
        };
        origLocation?: HTMLAnchorElement;
        destLocation?: HTMLAnchorElement;
        retry?: boolean;
        speedcheck?: boolean;
        disable?: boolean;
        option?: any;
    };
}

interface JQueryStatic {
    pjax: {
        (setting: PjaxSetting): any;
        enable(): any;
        disable(): any;
        click(url: string, attr: { href?: string; }): any;
        click(url: HTMLAnchorElement, attr: { href?: string; }): any;
        click(url: JQuery, attr: { href?: string; }): any;
        click(url: any, attr: { href?: string; }): any;
        submit(url: string, attr: { action?: string; method?: string; }, data: any): any;
        submit(url: HTMLFormElement, attr?: { action?: string; method?: string; }, data?: any): any;
        submit(url: JQuery, attr?: { action?: string; method?: string; }, data?: any): any;
        submit(url: any, attr?: { action?: string; method?: string; }, data?: any): any;
        follow(event: JQueryEventObject, ajax: JQueryXHR, timeStamp?: number): boolean;
        setCache(): any;
        setCache(url: string): any;
        setCache(url: string, data: string): any;
        setCache(url: string, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): any;
        getCache(): any;
        getCache(url: string): any;
        removeCache(url: string): any;
        removeCache(): any;
        clearCache(): any;
    };
}

interface JQuery {
    pjax(setting: PjaxSetting): any;
}