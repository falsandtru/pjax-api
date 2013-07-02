$(function()
{
  $.pjax(
  {
    area: 'div.pjax' ,
    load:
    {
      script: true
    }
  });
  alert( 'execute script [linked(head)]\n' + $('div.primary p:first-child').text() )
});