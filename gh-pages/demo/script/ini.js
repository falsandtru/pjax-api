$(function()
{
  $.pjax({
    area: 'div.pjax' ,
    load:
    {
      script: true
    }
  });
  console.log( 'execute script [linked(head)]\n' + $('div.primary p:first-child').text() )
});