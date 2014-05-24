'use strict';

describe('Directive: dropdown', function () {

  // load the directive's module
  beforeEach(module('dropApp'));

  var scope, 
      element, 
      directive, 
      compiled, 
      html;

  var dropdown  = [],
      trigger   = [],
      span      = null;

  beforeEach(function () {

    html = '<div cu-dropdown>'+
              '<div class="trigger dd1" cu-dd-trigger="dd1" >dd1 trigger</div>'+
              '<div class="dropdown dd1" cu-dd-body="dd1" >dd1 body</div>'+
              '<div class="trigger dd2" cu-dd-trigger="dd2" mode="toggle">dd2 trigger</div>'+
              '<div class="dropdown dd2" cu-dd-body="dd2" >dd2 body</div>'+
              '<div class="trigger dd3" cu-dd-trigger="dd3" mode="open">dd3 trigger</div>'+
              '<div class="dropdown dd3" cu-dd-body="dd3" >dd3 body</div>'+
            '</div>'+
            '<span style="width:10px">outside</span>';

    inject(function ($compile, $rootScope) {

        scope    = $rootScope.$new();
        element  = angular.element(html);
        compiled = $compile(element);

        compiled(scope);
        scope.$digest();

        // components initialisation
        var divs    = element.find('div');

        trigger[0]  = divs.eq(0);
        dropdown[0] = divs.eq(1);
        trigger[1]  = divs.eq(2);
        dropdown[1] = divs.eq(3);
        trigger[2]  = divs.eq(4);
        dropdown[2] = divs.eq(5);

        span = element.find('span');




    });
  })

  it('should hide all dropdown at the beginning', function () {

    for (var i = 0, dd; dd = dropdown[i]; i++) {
        expect(dd.hasClass('hidden')).toBe(true);
    }
  });

  it('should show only one dropdown', function () {

    trigger[0][0].click();

    expect(dropdown[0].hasClass('hidden')).toBe(false);
    expect(dropdown[1].hasClass('hidden')).toBe(true);
    expect(dropdown[2].hasClass('hidden')).toBe(true);
  });

  it('should stay open if mode is set to default', function () {

    trigger[0][0].click();
    expect(dropdown[0].hasClass('hidden')).toBe(false);

    trigger[0][0].click();
    expect(dropdown[0].hasClass('hidden')).toBe(false);

    trigger[0][0].click();
    expect(dropdown[0].hasClass('hidden')).toBe(false);
    
  });

  it('should toggle if mode is set to toggle', function () {

    trigger[1][0].click();
    expect(dropdown[1].hasClass('hidden')).toBe(false);

    trigger[1][0].click();
    expect(dropdown[1].hasClass('hidden')).toBe(true);

    trigger[1][0].click();
    expect(dropdown[1].hasClass('hidden')).toBe(false);
    
  });

  it('should stay open if mode is set to open', function () {

    trigger[2][0].click();
    expect(dropdown[2].hasClass('hidden')).toBe(false);

    trigger[2][0].click();
    expect(dropdown[2].hasClass('hidden')).toBe(false);

    trigger[2][0].click();
    expect(dropdown[2].hasClass('hidden')).toBe(false);
    
  });


  // TODO : Not Working
  // it('should hide all dropdown if user click outside', function () {

  //   trigger[0][0].click();
  //   span.click();

  //   expect(dropdown[0].hasClass('hidden')).toBe(true);
  //   expect(dropdown[1].hasClass('hidden')).toBe(true);
  //   expect(dropdown[2].hasClass('hidden')).toBe(true);

  
  // });
});
