<%@ page title="Order" language="C#" masterpagefile="~/MasterPage.master" autoeventwireup="true" inherits="modules_admin_order_form, App_Web_order_form.aspx.8c4528a7" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <%= this.AttachCss("ui-pos.css") %>
    <%= this.GetJsVar()%>
    <%= this.AttachJs("app-admin/order-form.js") %>

    <div class="pos-div">
        <div class="r">
            <div class="flx-nw">
                <div class="flx-nw bar-top0 btn-back0">
                    <div class="btn-back material-icons"></div>
                    <div class="r1-1 doc-no"></div>
                    <div class="doc-status"></div>
                    <div class="sub-title doc-mod-on"></div>
                    <div class="sub-title0"></div>
                </div>
                <div class="bar-top1">
                    <div class="tr-date0 flx-nw">
                        <div class="tr-date1">Tx date:</div>
                        <div class="tr-date"></div>
                    </div>
                </div>
                <div class="bar-top2">
                    <div class="mod-on0" style="display: none;">
                        <div class="mod-on"></div>
                        <div class="mod-on1">Mod on:</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="flx-nw">

            <div class="col1">



                <div class="flx-nw">
                    <div class="r10">
                        <div class="flx-nw">
                            <div class="c10">Qty</div>
                            <div class="c11">Description</div>
                            <div class="c12">Amount</div>
                        </div>

                        <div class="flx-nw item-list">
                            <div></div>
                        </div>


                    </div>

                    <div class="r11">
                        <div class="btn3 void-item-axn">Void item</div>
                        <div class="btn3 chg-price-axn">Override price</div>
                        <div class="btn3 item-disc-axn">Item disc</div>
                        <div class="btn3 bill-disc-axn">Bill disc</div>
                        <%--<div class="btn3 split-bill-axn" style="display:none;">Split bill</div>--%>
                        <div class="btn3 new-order-axn">Reset order</div>
                        <div class="btn3 void-order-axn">Void order</div>
                    </div>
                </div>

                <div class="flx-nw summ0">
                    <div class="c20">
                        <div class="c20-2 bill-disc-amt">0.00</div>
                        <div class="c20-1">Bill Disc.</div>
                    </div>

                    <div class="c20">
                        <div class="c20-2 bill-disc-pct">0.00</div>
                        <div class="c20-1">Bill Disc. %</div>
                    </div>

                    <div class="c20">
                        <div class="c20-2 tot-disc">0.00</div>
                        <div class="c20-1">Total Disc.</div>
                    </div>

                    <div class="c20">
                        <div class="c20-2 tot-tax">0.00</div>
                        <div class="c20-1">Total Tax</div>
                    </div>

                    <div class="c20">
                        <div class="c20-2 rounding">0.00</div>
                        <div class="c20-1">Rounding</div>
                    </div>
                </div>

                <div class="flx-nw r20 summ0">
                    <div class="r20-2 tot-amt">0.00</div>
                    <div class="r20-1 curr-code"></div>
                </div>
            </div>

            <div class="col2">
                <div class="col2-1 order-h">
                    <div class="flx-nw">
                        <div class="tr-status-input"></div>
                    </div>
                    <div class="flx-nw">
                        <div class="c1">
                            <div>Table #</div><!--fikry-->
                            <div class="flx-nw">
                                <div class="c1-1">
								<div class="table-pos" id="table-click"></div>
								<table id = "table1">
									<tr>
										<th>box 1</th>
									</tr>
								</table>
                                    <input class="txt-input table-no-input" type="text" maxlength="50" />
                                </div>
                                <div class="material-icons btn-sel-tb"></div>
                            </div>
                        </div>

                        <div class="c2">
                            <div># of guest</div>
                            <div>
                                <input class="txt-input pax-cnt-input" type="text" placeholder="# of people" maxlength="3" />
                            </div>
                        </div>
                    </div>

                    <div class="flx-nw">
                        <div class="c1">
                            <div>Guest</div>
                            <div class="flx-nw">
                                <div class="c1-1">
                                    <input class="txt-input guest-name-input" type="text" maxlength="255" />
                                </div>
                            </div>
                        </div>

                        <div class="c2">
                            <div class="room-no0">Room #</div>
                            <div>
                                <input class="txt-input room-no-input" type="text" placeholder="room #" maxlength="50" />
                            </div>
                        </div>
                    </div>

                    <div class="delivery0" style="display: none;">
                        <div class="delivery-note"></div>
                        <div>Delivery time</div>
                        <div class="flx-nw">
                            <div class="c1-1 flx-nw">
                                <select class="txt-input delivery-hour"></select>
                                <select class="txt-input delivery-minute"></select>
                            </div>
                        </div>
                        <div class="flx-nw">
                            <div class="material-icons btn-checkbox0 delivery-next-day-input"></div>
                            <div class="chk-lbl delivery-next-day0">Deliver on tomorrow</div>
                        </div>
                    </div>
                </div>

                <div class="row1">
                    <div class="flx-nw row1-1 btn-prd0">
                        <div class="btn-prd material-icons"></div>
                        <div>Menu</div>
                    </div>
                    <div class="flx-nw row1-1 btn-save0">
                        <div class="btn-save material-icons"></div>
                        <div>Submit order</div>
                    </div>
                    <div class="flx-nw row1-1 btn-print0">
                        <div class="btn-print material-icons"></div>
                        <div>Print receipt</div>
                    </div>
                    <div class="flx-nw row1-1 btn-pay0">
                        <div class="btn-pay material-icons"></div>
                        <div>Pay</div>
                    </div>
                </div>

            </div>

        </div>



        <div class="template-div" style="display: none;">

            <div class="r10-1 item-line0">
                <div class="flx-nw">
                    <div class="c13 qty"></div>
                    <div class="c14 prod-desc"></div>
                    <div class="c15 amt"></div>
                    <div class="c16 sel">
                        <div class="material-icons btn-checkbox0"></div>
                    </div>
                    <!-- Dustbin Icon -->
                    <div class="c17 sel">
                        <div class="btn-delete material-icons"></div>
                    </div>
                </div>
                <div class="addon"></div>

            </div>

            <div class="flx-nw addon-item0">
                <div class="c13"></div>
                <div class="c14 addon-desc"></div>
            </div>




            <div class="sel-prd-item0">
                <div class="flx-nw sel-prd-h1">
                    <div class="flx-nw sel-prd-h1-left">
                        <div class="axn-search flx-nw">
                            <div class="search-item-code0">Item code:</div>
                            <input type="text" class="search-item-code" maxlength="50" />
                        </div>
                        <div class="axn-prg"></div>
                        <div class="axn-status"></div>
                    </div>
                    <div class="sel-prd-h1-right">
                        <div class="btn-save btn-cfm-prd material-icons btn-bg2"></div>
                    </div>
                </div>

                <div class="flx-nw">
                    <div class="cat-list0">
                        <div class="flx-nw cat-h">
                            <div class="btn-prd-cat material-icons"></div>
                            <div>Category</div>
                        </div>
                        <div class="cat-list">
                            <div></div>
                        </div>
                    </div>


                    <div class="prd-item-list0">
                        <div class="prd-catalog-div">
                            <div class="flx-nw r1">
                                <div class="flx-nw sel-axn">
                                    <div class="c1 axn-step step1" data-val="1">
                                        <div class="c1-1">step 1</div>
                                        <div class="c1-2 sel-step">
                                            <div class="txt">Product</div>
                                            <div class="cnt">0</div>
                                        </div>
                                    </div>
                                    <div class="c1 axn-step step2" data-val="2">
                                        <div class="c1-1">step 2</div>
                                        <div class="c1-2">
                                            <div class="txt">Selection</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="prd-item-list">
                                    <div class="grid-temp"></div>
                                </div>
                                <div class="sel-prod-item" style="display: none;">
                                    <div class="sel-prod-desc"></div>
                                    <div class="flx-nw qty0">
                                        <div class="qty1">Qty:</div>
                                        <div>
                                            <input type="text" class="qty-input" maxlength="3" value="1" />
                                        </div>
                                        <div class="btn-qty-less material-icons"></div>
                                        <div class="btn-qty-add material-icons"></div>
                                    </div>
                                    <div class="flx-nw remarks0">
                                        <div class="remarks1">Remarks:</div>
                                        <div class="remarks2">
                                            <input type="text" class="remarks-input" maxlength="255" />
                                        </div>
                                    </div>
                                    <div class="extra0">
                                        <div class="addon-item-list">
                                            <div class="grid-temp"></div>
                                        </div>
                                        <div class="condim-item-list">
                                            <div class="grid-temp"></div>
                                        </div>
                                        <div class="req-item-list">
                                            <div class="grid-temp"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>



            <div class="cat-item0">
                <div class="cat-desc"></div>
            </div>

            <div class="prd-item0">
                <div class="prod-desc"></div>
                <div class="prod-code"></div>
                <div class="price"></div>
                <div class="avail-qty" style="display: none;"></div>
            </div>

            <div class="proc-addon-item0">
                <div class="proc-addon-desc"></div>
            </div>

            <div class="condim-item0">
                <div class="condim-desc"></div>
            </div>

            <div class="req-group0">
                <div class="req-group"></div>
                <div class="flx-w req-il"></div>
            </div>

            <div class="req-item0">
                <div class="req-desc"></div>
            </div>

            <div class="table-item0">
                <div class="table-no"></div>
            </div>

            <!-- Void item -->
            <div class="void-px-pp0">
                <div class="t1 flx-nw">
                    <div class="t1-1">
                        Voided Item
                    </div>
                    <div class="axn">
                        <div class="btn-cancel material-icons btn-bg2"></div>
                        <div class="btn-void-item material-icons btn-bg1"></div>
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Reason
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 void-remarks-input" maxlength="255" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Voided by
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 void-by-input" maxlength="255" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Password
                    </div>
                    <div>
                        <input type="password" class="txt-input-3 void-pwd-input" maxlength="255" />
                    </div>
                </div>
            </div>

            <!-- Overrided Price -->
            <div class="ovr-px-pp0">
                <div class="t1 flx-nw">
                    <div class="t1-1">
                        Override unit price
                    </div>
                    <div class="axn">
                        <div class="btn-cancel material-icons btn-bg2"></div>
                        <div class="btn-chg-price material-icons btn-bg1"></div>
                    </div>
                </div>
                <div class="r1">
                    <div class="l0">
                        Current unit price
                    </div>
                    <div class="curr-price">0.00</div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        New UNIT price
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 new-price-input" maxlength="15" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Reason
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 ovr-remarks-input" maxlength="255" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Override by
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 ovr-by-input" maxlength="255" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Password
                    </div>
                    <div>
                        <input type="password" class="txt-input-3 ovr-pwd-input" maxlength="255" />
                    </div>
                </div>
            </div>


            <div class="disc-pp0">
                <div class="t1 flx-nw">
                    <div class="t1-1">
                        Bill discount
                    </div>
                    <div class="axn">
                        <div class="btn-cancel material-icons btn-bg2"></div>
                        <div class="btn-disc material-icons btn-bg1"></div>
                    </div>
                </div>
                <div class="r1">
                    <div class="l0">
                        Discount %
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 disc-pct-input" maxlength="15" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0">
                        Discount amount
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 disc-amt-input" maxlength="15" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Reason
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 ovr-remarks-input" maxlength="255" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Override by
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 ovr-by-input" maxlength="255" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Password
                    </div>
                    <div>
                        <input type="password" class="txt-input-3 ovr-pwd-input" maxlength="255" />
                    </div>
                </div>
            </div>



            <div class="void-order-pp0">
                <div class="t1 flx-nw">
                    <div class="t1-1">
                        Void order
                    </div>
                    <div class="axn">
                        <div class="btn-cancel material-icons btn-bg2"></div>
                        <div class="btn-void-order material-icons btn-bg1"></div>
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Your ID
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 ovr-by-input" maxlength="255" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Password
                    </div>
                    <div>
                        <input type="password" class="txt-input-3 ovr-pwd-input" maxlength="255" />
                    </div>
                </div>
                <div class="r1">
                    <div class="l0 compulsory-mark">
                        Reason
                    </div>
                    <div>
                        <input type="text" class="txt-input-3 ovr-remarks-input" maxlength="255" />
                    </div>
                </div>
            </div>




            <div class="pos-pay-pp0">
                <div class="r">
                    <div class="flx-nw">
                        <div class="flx-nw r1 btn-pymt-back0">
                            <div class="btn-back material-icons"></div>
                            <div class="sub-title">Payment</div>
                        </div>
                        <div class="axn">
                            <%--<div class="btn-print material-icons btn-bg1"></div>--%>
                            <div class="btn-save material-icons btn-bg2"></div>
                            <div class="btn-add material-icons btn-bg3"></div>
                        </div>
                    </div>
                </div>
                <div class="flx-nw1">
                    <div class="col2">
                        <div class="r10">
                            <div class="compulsory-mar">Payment type</div>
                            <div class="flx-nw">
                                <div class="r10-1">
                                    <div class="txt-input pymt-type-input"></div>
                                    <input type="hidden" class="pymt-type-id-input" />
                                </div>
                                <div class="btn-select btn-select-pymt-type material-icons"></div>
                            </div>
                            <div class="compulsory-mar">Amount</div>
                            <div>
                                <input class="txt-input amt-input" type="text" maxlength="50" />
                            </div>
                            <div class="ref-no0-input">Ref #</div>
                            <div>
                                <input class="txt-input ref-no-input" type="text" maxlength="255" />
                            </div>
                            <div class="remarks0-input">Remark</div>
                            <div>
                                <input class="txt-input remarks-input" type="text" maxlength="255" />
                            </div>
                        </div>


                        <div class="r12 num-pad">
                            <div class="flx-nw">
                                <div class="r12-1">
                                    <div class="flx-nw">
                                        <div class="r12-1-1 key" data-val="7">7</div>
                                        <div class="r12-1-1 key" data-val="8">8</div>
                                        <div class="r12-1-1 key" data-val="9">9</div>
                                    </div>
                                    <div class="flx-nw">
                                        <div class="r12-1-1 key" data-val="4">4</div>
                                        <div class="r12-1-1 key" data-val="5">5</div>
                                        <div class="r12-1-1 key" data-val="6">6</div>
                                    </div>
                                    <div class="flx-nw">
                                        <div class="r12-1-1 key" data-val="1">1</div>
                                        <div class="r12-1-1 key" data-val="2">2</div>
                                        <div class="r12-1-1 key" data-val="3">3</div>
                                    </div>
                                    <div class="flx-nw">
                                        <div class="r12-1-3 key" data-val="0">0</div>
                                        <div class="r12-1-2 key" data-val=".">.</div>
                                        <div class="r12-1-2 key" data-val="del">del</div>
                                    </div>
                                </div>
                                <div class="r12-2">
                                    <div class="r12-2-2 key" data-val="$ex">Exact</div>
                                    <div class="r12-2-1 key" data-val="$5"><span class="curr-code"></span>5</div>
                                    <div class="r12-2-1 key" data-val="$10"><span class="curr-code"></span>10</div>
                                    <div class="r12-2-1 key" data-val="$50"><span class="curr-code"></span>50</div>
                                    <div class="r12-2-1 key" data-val="$100"><span class="curr-code"></span>100</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col1">
                        <div>
                            <div class="sub-title-1">Payment Summary</div>
                            <div class="flx-nw summ">
                                <div class="r9 payable">
                                    <div class="r9-2 amt">0.00</div>
                                    <div class="r9-1">Payable</div>
                                </div>
                                <div class="r9 paid">
                                    <div class="r9-2 amt">0.00</div>
                                    <div class="r9-1">Tender</div>
                                </div>
                                <div class="r9 due">
                                    <div class="r9-2 amt">0.00</div>
                                    <div class="r9-1">Due</div>
                                </div>
                                <div class="r9 chg-due">
                                    <div class="r9-2 amt">0.00</div>
                                    <div class="r9-1">Change due</div>
                                </div>
                                <%--<div class="r9 forfeit">
                                    <div class="r9-2 amt">0.00</div>
                                    <div class="r9-1">Forfeited</div>
                                </div>--%>
                            </div>
                        </div>
                        <div>
                            <div class="sub-title-1">Payment method</div>
                            <div class="flx-nw col1-1">
                                <div class="c1">Type</div>
                                <div class="c1">Amount</div>
                                <div class="c2">Ref #</div>
                                <div class="c2">Remarks</div>
                            </div>
                            <div class="pay-item-list">
                                <div></div>
                            </div>
                        </div>
                    </div>


                    
                </div>


                <div class="btn-complete-sales0">
                    <div class="flx-nw">
                        <div class="btn-save btn-complete-sales material-icons"></div>
                        <div class="t0">
                            Complete sales
                        </div>
                    </div>
                </div>
            </div>

            <div class="flx-nw col1-2 pymt-item0">
                <div class="c3 pymt-type"></div>
                <div class="c3 amt"></div>
                <div class="c4 ref-no"></div>
                <div class="c4 remarks"></div>
            </div>



            <div class="tb-item0">
                <div class="flx-nw">
                    <div class="ico material-icons"></div>
                    <div class="text">11</div>
                    <div class="occ" style="display: none;">Occupied</div>
                </div>
            </div>
        </div>    
        
        <!-- Lee create mobile view -->
        <div class="mobile-axn-pp2">
            <div class="mobile-content2">
                <div class="col2-1 order-h">
                    <div class="flx-nw">
                        <div class="tr-status-input"></div>
                    </div>
                    <div class="flx-nw">
                        <div class="c1">
                            <div>Table #</div>
                            <div class="flx-nw">
                                <div class="c1-1">
                                    <input class="txt-input table-no-input" type="text" maxlength="50" />
                                </div>
                                <div class="material-icons btn-sel-tb"></div>
                            </div>
                        </div>

                        <div class="c2">
                            <div># of guest</div>
                            <div>
                                <input class="txt-input pax-cnt-input" type="text" placeholder="# of people" maxlength="3" />
                            </div>
                        </div>
                    </div>

                    <div class="flx-nw">
                        <div class="c1">
                            <div>Guest</div>
                            <div class="flx-nw">
                                <div class="c1-1">
                                    <input class="txt-input guest-name-input" type="text" maxlength="255" />
                                </div>
                            </div>
                        </div>

                        <div class="c2">
                            <div class="room-no0">Room #</div>
                            <div>
                                <input class="txt-input room-no-input" type="text" placeholder="room #" maxlength="50" />
                            </div>
                        </div>
                    </div>

                    <div class="delivery0" style="display: none;">
                        <div class="delivery-note"></div>
                        <div>Delivery time</div>
                        <div class="flx-nw">
                            <div class="c1-1 flx-nw">
                                <select class="txt-input delivery-hour"></select>
                                <select class="txt-input delivery-minute"></select>
                            </div>
                        </div>
                        <div class="flx-nw">
                            <div class="material-icons btn-checkbox0 delivery-next-day-input"></div>
                            <div class="chk-lbl delivery-next-day0">Deliver on tomorrow</div>
                        </div>
                    </div>
                </div>

                <div class="row1">
                    <div class="flx-nw row1-1 btn-prd0">
                        <div class="btn-prd material-icons"></div>
                        <div>Menu</div>
                    </div>
                    <div class="flx-nw row1-1 btn-save0">
                        <div class="btn-save material-icons"></div>
                        <div>Submit order</div>
                    </div>
                    <div class="flx-nw row1-1 btn-print0">
                        <div class="btn-print material-icons"></div>
                        <div>Print receipt</div>
                    </div>
                    <div class="flx-nw row1-1 btn-pay0">
                        <div class="btn-pay material-icons"></div>
                        <div>Pay</div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Lee create mobile view -->
        <div class="mobile-btn-pp1">
            <div class="mobile-content1">
                <div class="mobile-btn void-item-axn">
                    <div class="flx-nw">
                        <div class="btn-delete-mobile material-icons"></div>
                        <div>Void Item</div>
                    </div>
                </div>
                <div class="mobile-btn chg-price-axn">
                    <div class="flx-nw">
                        <div class="btn-ovr-price material-icons"></div>
                        <div>Override Price</div>
                    </div>
                </div>
                <div class="mobile-btn item-disc-axn">
                    <div class="flx-nw">
                        <div class="btn-discount material-icons"></div>
                        <div>Item Disc</div>
                    </div>
                </div>
                <div class="mobile-btn bill-disc-axn">
                    <div class="flx-nw">
                        <div class="btn-discount material-icons"></div>
                        <div>Bill Disc</div>
                    </div>
                </div>
                <%--<div class="mobile-btn split-bill-axn" style="display:none;">Split bill</div>--%>
                <div class="mobile-btn new-order-axn">
                    <div class="flx-nw">
                        <div class="btn-refresh-mobile material-icons"></div>
                        <div>Reset Order</div>
                    </div>
                </div>
                <div class="mobile-btn void-order-axn">
                    <div class="flx-nw">
                        <div class="btn-delete-mobile material-icons"></div>
                        <div>Void Order</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 3 April 2023, Lee -create tablet view -->
    <div class="tablet-btn-pp1">
        <div class="tablet-content1">
            <div class="col2-1 order-h">
                <div class="flx-nw">
                    <div class="tr-status-input"></div>
                </div>
                <div class="flx-nw">
                    <div class="c1">
                        <div>Table #</div>
                        <div class="flx-nw">
                            <div class="c1-1">
                                <input class="txt-input table-no-input" type="text" maxlength="50" />
                            </div>
                            <div class="material-icons btn-sel-tb"></div>
                        </div>
                    </div>

                    <div class="c2">
                        <div># of guest</div>
                        <div>
                            <input class="txt-input pax-cnt-input" type="text" placeholder="# of people" maxlength="3" />
                        </div>
                    </div>
                </div>

                <div class="flx-nw">
                    <div class="c1">
                        <div>Guest</div>
                        <div class="flx-nw">
                            <div class="c1-1">
                                <input class="txt-input guest-name-input" type="text" maxlength="255" />
                            </div>
                        </div>
                    </div>

                    <div class="c2">
                        <div class="room-no0">Room #</div>
                        <div>
                            <input class="txt-input room-no-input" type="text" placeholder="room #" maxlength="50" />
                        </div>
                    </div>
                </div>

                <div class="delivery0" style="display: none;">
                    <div class="delivery-note"></div>
                    <div>Delivery time</div>
                    <div class="flx-nw">
                        <div class="c1-1 flx-nw">
                            <select class="txt-input delivery-hour"></select>
                            <select class="txt-input delivery-minute"></select>
                        </div>
                    </div>
                    <div class="flx-nw">
                        <div class="material-icons btn-checkbox0 delivery-next-day-input"></div>
                        <div class="chk-lbl delivery-next-day0">Deliver on tomorrow</div>
                    </div>
                </div>
            </div>

            <div class="row1">
                <div class="flx-nw row1-1 btn-prd0">
                    <div class="btn-prd material-icons"></div>
                    <div>Menu</div>
                </div>
                <div class="flx-nw row1-1 btn-save0">
                    <div class="btn-save material-icons"></div>
                    <div>Submit order</div>
                </div>
                <div class="flx-nw row1-1 btn-print0">
                    <div class="btn-print material-icons"></div>
                    <div>Print receipt</div>
                </div>
                <div class="flx-nw row1-1 btn-pay0">
                    <div class="btn-pay material-icons"></div>
                    <div>Pay</div>
                </div>
            </div>

        </div>
    </div>

    

</asp:Content>

