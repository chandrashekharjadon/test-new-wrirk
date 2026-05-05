"use client";
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import "@fontsource/poppins";
import '@fontsource/roboto';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import PdfDownloadButton from "@/app/components/PdfDownload/PdfDownloadButton";

import {
    setServiceData,
    setResCatData,

    setSelectedMethod,
    setSelectedValue,
    setFilteredResCats,
    setSelectedResCatId,
    setPriceList,
    setMethodPrice,
    setMethodDollarPrice,
    setInrBelowtpPrice,
    setInrAbovetpPrice,
    setInrBelowtwPrice,
    setInrAbovetwPrice,
    setCalculatedPagePrice,
    setCalculatedDollarPagePrice,
    setDollarBelowtpPrice,
    setDollarAbovetpPrice,
    setDollarBelowtwPrice,
    setDollarAbovetwPrice,
    setCalculatedWordPrice,
    setCalculatedDollarWordPrice,
    setAddonCategories,
    setSelectedAddons,
    setNumPages,
    setMinPage,
    setMaxPage,
    setThresholdPage,
    setNumWords,
    setMinWord,
    setMaxWord,
    setThresholdWord,
    setSelectedUnit,
    setSelectedCurrency,
    setToolList,
    setShowToolSel,
    setSelectedTool,
    setToolCounts,
    setDiscount,

    setTande,
    setDesc,

    setError,
    setLoading,
} from "../../../../features/quotaion/serviceSlice";
import { set } from 'mongoose';
import { buildPdfPayload } from '@/app/utils/PdfDownload/buildPdfPayload';
import { Phone } from 'lucide-react';
import { useGetAllDataQuotationQuery } from '@/app/services/quotation';
import Loading from '@/app/loading';

const ServiceDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        serviceData,
        resCatData,

        selectedMethod,
        selectedValue,
        filteredResCats,
        selectedResCatId,
        priceList,
        methodPrice,
        methodDollarPrice,
        inrBelowtpPrice,
        inrAbovetpPrice,
        inrBelowtwPrice,
        inrAbovetwPrice,
        dollarBelowtpPrice,
        dollarAbovetpPrice,
        dollarBelowtwPrice,
        dollarAbovetwPrice,
        calculatedPagePrice,
        calculatedDollarPagePrice,
        calculatedWordPrice,
        calculatedDollarWordPrice,
        addonCategories,
        selectedAddons,
        numPages,
        minPage,
        maxPage,
        thresholdPage,
        numWords,
        minWord,
        maxWord,
        thresholdWord,
        selectedUnit,
        selectedCurrency,
        toolList,
        showToolSel,
        selectedTool,
        toolCounts,
        discount,

        tande,
        desc,

        error,
        loading,
    } = useSelector((state) => state.service);

    const { data, isLoading } = useGetAllDataQuotationQuery(id);

    const { Research_category, PriceData, Tool, TandE, Desc, serviceData: GetServiceDataById } = data || {};
    // const GetServiceDataById = GetServiceData?.find(s => s._id === id) || {};

    // Get res cat data
    useEffect(() => {
        if (!data) return;

        dispatch(setResCatData(Research_category || {}));
        dispatch(setTande(TandE || {}));
        dispatch(setDesc(Desc || {}));
        dispatch(setServiceData(GetServiceDataById || {}));
        dispatch(setPriceList(PriceData || {}));
        dispatch(setToolList(Tool || {}));
    }, [data, id, dispatch]);

    // Get service data
    useEffect(() => {
        if (!serviceData) return;

        const firstMethod = serviceData?.Method?.[0];

        if (!firstMethod) return;

        dispatch(setLoading(false));
        dispatch(setSelectedMethod(firstMethod.Name));
        dispatch(setSelectedValue(firstMethod.Values?.[0] || ''));

        processResCats(firstMethod);

        const {
            inr,
            usd,
            maxPage,
            maxWord,
            thresholdPage,
            thresholdWord,
            inrBelowtpPrice,
            inrAbovetpPrice,
            inrBelowtwPrice,
            inrAbovetwPrice,
            dollarBelowtpPrice,
            dollarAbovetpPrice,
            dollarBelowtwPrice,
            dollarAbovetwPrice,
            discount
        } = getPriceForMethod(firstMethod);

        // console.log('inr', inr);
        // console.log('usd', usd);
        // console.log('maxPage', maxPage);
        // console.log('maxWord', maxWord);
        // console.log('thresholdPage', thresholdPage);
        // console.log('thresholdWord', thresholdWord);
        // console.log('inrBelowtpPrice', inrBelowtpPrice);
        // console.log('inrAbovetpPrice', inrAbovetpPrice);
        // console.log('inrBelowtwPrice', inrBelowtwPrice);
        // console.log('inrAbovetwPrice', inrAbovetwPrice);
        // console.log('dollarBelowtpPrice', dollarBelowtpPrice);
        // console.log('dollarAbovetpPrice', dollarAbovetpPrice);
        // console.log('dollarBelowtwPrice', dollarBelowtwPrice);
        // console.log('dollarAbovetwPrice', dollarAbovetwPrice);
        // console.log('discount', discount);



        dispatch(setMethodPrice(inr));
        dispatch(setMethodDollarPrice(usd));
        dispatch(setMaxPage(maxPage));
        dispatch(setMaxWord(maxWord));
        dispatch(setDiscount(discount));
        dispatch(setThresholdPage(thresholdPage));
        dispatch(setThresholdWord(thresholdWord));
        dispatch(setInrBelowtpPrice(inrBelowtpPrice));
        dispatch(setInrAbovetpPrice(inrAbovetpPrice));
        dispatch(setInrBelowtwPrice(inrBelowtwPrice));
        dispatch(setInrAbovetwPrice(inrAbovetwPrice));
        dispatch(setDollarBelowtpPrice(dollarBelowtpPrice));
        dispatch(setDollarAbovetpPrice(dollarAbovetpPrice));
        dispatch(setDollarBelowtwPrice(dollarBelowtwPrice));
        dispatch(setDollarAbovetwPrice(dollarAbovetwPrice));

    }, [serviceData, dispatch]);

    useEffect(() => {
        if (!serviceData || !priceList?.length) return;

        const current = serviceData.Method?.find(
            (m) => m.Name === selectedMethod
        );

        if (!current) return;

        const priceData = getPriceForMethod(current);

        dispatch(setMethodPrice(priceData.inr));
        dispatch(setMethodDollarPrice(priceData.usd));
        dispatch(setMaxPage(priceData.maxPage));
        dispatch(setMaxWord(priceData.maxWord));
        dispatch(setDiscount(priceData.discount));
        dispatch(setThresholdPage(priceData.thresholdPage));
        dispatch(setThresholdWord(priceData.thresholdWord));
        dispatch(setInrBelowtpPrice(priceData.inrBelowtpPrice));
        dispatch(setInrAbovetpPrice(priceData.inrAbovetpPrice));
        dispatch(setInrBelowtwPrice(priceData.inrBelowtwPrice));
        dispatch(setInrAbovetwPrice(priceData.inrAbovetwPrice));
        dispatch(setDollarBelowtpPrice(priceData.dollarBelowtpPrice));
        dispatch(setDollarAbovetpPrice(priceData.dollarAbovetpPrice));
        dispatch(setDollarBelowtwPrice(priceData.dollarBelowtwPrice));
        dispatch(setDollarAbovetwPrice(priceData.dollarAbovetwPrice));

        // if (current) {
        //     const { inr, usd, maxPage, maxWord, thresholdPage, thresholdWord, inrBelowtpPrice, inrAbovetpPrice, inrBelowtwPrice, inrAbovetwPrice, dollarBelowtpPrice, dollarAbovetpPrice, dollarBelowtwPrice, dollarAbovetwPrice, discount } = getPriceForMethod(current);
        //     dispatch(setMethodPrice(inr));
        //     dispatch(setMethodDollarPrice(usd));
        //     dispatch(setMaxPage(maxPage));
        //     dispatch(setMaxWord(maxWord));
        //     dispatch(setDiscount(discount));
        //     dispatch(setThresholdPage(thresholdPage));
        //     dispatch(setThresholdWord(thresholdWord));
        //     dispatch(setInrBelowtpPrice(inrBelowtpPrice));
        //     dispatch(setInrAbovetpPrice(inrAbovetpPrice));
        //     dispatch(setInrBelowtwPrice(inrBelowtwPrice));
        //     dispatch(setInrAbovetwPrice(inrAbovetwPrice));
        //     dispatch(setDollarBelowtpPrice(dollarBelowtpPrice));
        //     dispatch(setDollarAbovetpPrice(dollarAbovetpPrice));
        //     dispatch(setDollarBelowtwPrice(dollarBelowtwPrice));
        //     dispatch(setDollarAbovetwPrice(dollarAbovetwPrice));
        // }
    }, [priceList, serviceData, selectedMethod, dispatch]);

    useEffect(() => {
        if (addonCategories.length > 0) {
            const defaults = {};
            addonCategories.forEach(cat => {
                if (cat.Addons_Item?.length > 0) {
                    defaults[cat._id] = cat.Addons_Item[0];
                }
            });
            dispatch(setSelectedAddons(defaults));
        }
    }, [addonCategories]);

    useEffect(() => {
        if (numPages === '' || thresholdPage === '') return;

        const pageCount = Number(numPages);
        const thresholdP = Number(thresholdPage);
        const belowRate = Number(inrBelowtpPrice);
        const aboveRate = Number(inrAbovetpPrice);
        let total = 0;
        if (pageCount <= thresholdP) {
            total = pageCount * belowRate;
        } else {
            total = thresholdP * belowRate + (pageCount - thresholdP) * aboveRate;
        }

        dispatch(setCalculatedPagePrice(total));
    }, [numPages, thresholdPage, inrBelowtpPrice, inrAbovetpPrice]);

    useEffect(() => {
        if (numWords === '' || thresholdWord === '') return;

        const wordCount = Number(numWords);
        const thresholdW = Number(thresholdWord);
        const belowRate = Number(inrBelowtwPrice);
        const aboveRate = Number(inrAbovetwPrice);

        let total = 0;
        if (wordCount <= thresholdW) {
            total = wordCount * belowRate;
        } else {
            total = thresholdW * belowRate + (wordCount - thresholdW) * aboveRate;
        }

        dispatch(setCalculatedWordPrice(total));
    }, [numWords, thresholdWord, inrBelowtwPrice, inrAbovetwPrice]);

    useEffect(() => {
        if (numPages === '' || thresholdPage === '') return;

        const pageCount = Number(numPages);
        const threshold = Number(thresholdPage);
        const belowRate = Number(dollarBelowtpPrice);
        const aboveRate = Number(dollarAbovetpPrice);

        let total = 0;
        if (pageCount <= threshold) {
            total = pageCount * belowRate;
        } else {
            total = threshold * belowRate + (pageCount - threshold) * aboveRate;
        }

        dispatch(setCalculatedDollarPagePrice(total));
    }, [numPages, thresholdPage, dollarBelowtpPrice, dollarAbovetpPrice]);

    useEffect(() => {
        if (numWords === '' || thresholdWord === '') return;

        const wordCount = Number(numWords);
        const threshold = Number(thresholdWord);
        const belowRate = Number(dollarBelowtwPrice);
        const aboveRate = Number(dollarAbovetwPrice);

        let total = 0;
        if (wordCount <= threshold) {
            total = wordCount * belowRate;
        } else {
            total = threshold * belowRate + (wordCount - threshold) * aboveRate;
        }

        dispatch(setCalculatedDollarWordPrice(total));
    }, [numWords, thresholdWord, dollarBelowtwPrice, dollarAbovetwPrice]);

    const handleMethodChange = (e) => {
        const methodName = e.target.value;
        dispatch(setSelectedMethod(methodName));

        const method = serviceData.Method?.find(m => m.Name === methodName);
        if (method) {
            dispatch(setSelectedValue(method.Values?.[0] || ''));
            processResCats(method);

            const { inr, usd } = getPriceForMethod(method);
            dispatch(setMethodPrice(inr));
            dispatch(setMethodDollarPrice(usd));
        }
    };

    const processResCats = (method) => {
        const methodResCats = method.Res_Cat_ids || [];



        const allResCats = [
            ...(resCatData.result || []),
            ...(resCatData.pw_true || []),
            ...(resCatData.pw_false || []),
        ];

        const matched = methodResCats
            .map(rc => {
                const id = typeof rc === 'string' ? rc : rc._id;
                return allResCats.find(cat => cat._id === id);
            })
            .filter(Boolean);

        dispatch(setFilteredResCats(matched));
        const firstRC = matched[0] || null;
        dispatch(setSelectedResCatId(firstRC?._id || ''));
        processAddons(firstRC);
        dispatch(setNumPages(firstRC?.Min_Page || 0));
        dispatch(setMinPage(firstRC?.Min_Page || 0));
        dispatch(setNumWords(firstRC?.Min_Word || 0));
        dispatch(setMinWord(firstRC?.Min_Word || 0));
        dispatch(setDiscount(firstRC?.Discount || 0));
        dispatch(setThresholdPage(firstRC?.Threshold_Page || ''));
        dispatch(setThresholdWord(firstRC?.Threshold_word || ''));
        dispatch(setInrBelowtpPrice(firstRC?.Inr_Below_Threshod_Page_Price || ''));
        dispatch(setInrAbovetpPrice(firstRC?.Inr_Above_Threshod_Page_Price || ''));
        dispatch(setInrBelowtwPrice(firstRC?.Inr_Below_Threshod_Word_Price || ''));
        dispatch(setInrAbovetwPrice(firstRC?.Inr_Above_Threshod_Word_Price || ''));
        dispatch(setDollarBelowtpPrice(firstRC?.Dollar_Below_Threshod_Page_Price || ''));
        dispatch(setDollarAbovetpPrice(firstRC?.Dollar_Above_Threshod_Page_Price || ''));
        dispatch(setDollarBelowtwPrice(firstRC?.Dollar_Below_Threshod_Word_Price || ''));
        dispatch(setDollarAbovetwPrice(firstRC?.Dollar_Above_Threshod_Word_Price || ''));
        handleToolLogic(firstRC);
        dispatch(setSelectedResCatId(matched[0]?._id || ''));
    };

    const getPriceForMethod = (method) => {
        if (!method?.Price_id) {
            return {
                inr: null,
                usd: null,
                maxPage: null,
                maxWord: null
            };
        }

        // ✅ Case 1: Already populated object
        if (
            typeof method.Price_id === 'object' &&
            method.Price_id !== null &&
            'Inr_Price' in method.Price_id
        ) {
            const p = method.Price_id;

            return {
                inr: p.Inr_Price ?? null,
                usd: p.Dollar_Price ?? null,
                maxPage: p.Max_Page ?? null,
                maxWord: p.Max_word ?? null,
                discount: p.Discount ?? null,

                thresholdPage: p.Threshold_Page ?? null,
                thresholdWord: p.Threshold_word ?? null,

                // ✅ FIXED MAPPING
                inrBelowtpPrice: p.Inr_Below_Threshod_Page_Price ?? null,
                inrAbovetpPrice: p.Inr_Above_Threshod_Page_Price ?? null,

                inrBelowtwPrice: p.Inr_Below_Threshod_Word_Price ?? null,
                inrAbovetwPrice: p.Inr_Above_Threshod_Word_Price ?? null,

                dollarBelowtpPrice: p.Dollar_Below_Threshod_Page_Price ?? null,
                dollarAbovetpPrice: p.Dollar_Above_Threshod_Page_Price ?? null,

                dollarBelowtwPrice: p.Dollar_Below_Threshod_Word_Price ?? null,
                dollarAbovetwPrice: p.Dollar_Above_Threshod_Word_Price ?? null,
            };
        }

        // ✅ Case 2: ID reference → lookup in priceList
        const priceId =
            typeof method.Price_id === 'string'
                ? method.Price_id
                : method.Price_id._id;

        const match = priceList.find((p) => p._id === priceId);

        if (!match) return {};

        return {
            inr: match.Inr_Price ?? null,
            usd: match.Dollar_Price ?? null,
            maxPage: match.Max_Page ?? null,
            maxWord: match.Max_word ?? null,
            discount: match.Discount ?? null,

            thresholdPage: match.Threshold_Page ?? null,
            thresholdWord: match.Threshold_word ?? null,

            inrBelowtpPrice: match.Inr_Below_Threshod_Page_Price ?? null,
            inrAbovetpPrice: match.Inr_Above_Threshod_Page_Price ?? null,

            inrBelowtwPrice: match.Inr_Below_Threshod_Word_Price ?? null,
            inrAbovetwPrice: match.Inr_Above_Threshod_Word_Price ?? null,

            dollarBelowtpPrice: match.Dollar_Below_Threshod_Page_Price ?? null,
            dollarAbovetpPrice: match.Dollar_Above_Threshod_Page_Price ?? null,

            dollarBelowtwPrice: match.Dollar_Below_Threshod_Word_Price ?? null,
            dollarAbovetwPrice: match.Dollar_Above_Threshod_Word_Price ?? null,
        };
    };

    const processAddons = (resCat) => {
        if (!resCat?.Addons_ids?.length) {
            dispatch(setAddonCategories([]));
            dispatch(setSelectedAddons({}));
            return;
        }

        // console.log('resCat.Addons_ids', resCat.Addons_ids);


        // 👉 filter without "Select Given Data"
        const excludedNames = ["extra charges", "publication type"];

        // const filteredAddons = resCat.Addons_ids;

        const filteredAddons = resCat.Addons_ids.filter(cat =>
            !excludedNames.includes(cat.Name?.toLowerCase())
        );

        dispatch(setAddonCategories(filteredAddons));

        const initial = {};
        filteredAddons.forEach(cat => {
            const firstItem = cat.Addons_Item?.[0];
            if (firstItem) initial[cat._id] = firstItem._id;
        });
        dispatch(setSelectedAddons(initial));
    };

    const handleValueChange = (e) => dispatch(setSelectedValue(e.target.value));

    const handleResCatChange = (e) => {
        const id = e.target.value;
        dispatch(setSelectedResCatId(id));
        const resCat = filteredResCats.find(r => r._id === id);
        processAddons(resCat);
        dispatch(setNumPages(resCat?.Min_Page || 0));
        dispatch(setNumWords(resCat?.Min_Word || 0));
        dispatch(setSelectedUnit(resCat?.Min_Page ? 'page' : 'word'));
        handleToolLogic(resCat);
        if (resCat?.Require_Tool) {
            dispatch(setShowToolSel(true));
            if (toolList.length > 0) {
                dispatch(setSelectedTool(toolList[0]._id));
            }
        } else {
            dispatch(setShowToolSel(false));
            dispatch(setSelectedTool(''));
        }
    };

    const handleAddonItemChange = (addonId, selectedItemId) => {
        const category = addonCategories.find(cat => cat._id === addonId);
        const selectedItem = category?.Addons_Item?.find(item => item._id === selectedItemId);
        if (selectedItem) {
            const updated = {
                ...selectedAddons,
                [addonId]: selectedItem
            };
            dispatch(setSelectedAddons(updated));
        }
    };

    // useEffect(() => {
    //     const fetchPrices = async () => {
    //         try {
    //             const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siteapi/price`);
    //             console.log('Fetched price list:', res.data);
    //             if (Array.isArray(res.data)) {
    //                 dispatch(setPriceList(res.data));
    //                 // console.log("Fetched price list:", res.data);
    //             } else {
    //                 console.error('Price API did not return an array');
    //             }
    //         } catch (err) {
    //             console.error('Error fetching prices:', err.message);
    //         }
    //     };
    //     fetchPrices();
    // }, []);

    // tool api
    // useEffect(() => {
    //     const getAddTools = async () => {
    //         try {
    //             const result = await axios.get(
    //                 `${process.env.NEXT_PUBLIC_API_BASE_URL}/siteapi/tool`
    //             );
    //             if (Array.isArray(result.data)) {
    //                 dispatch(setToolList(result.data));
    //             } else {
    //                 console.error('Tool API did not return an array');
    //             }
    //             // console.log('tool result', result.data);
    //         } catch (err) {
    //             console.error('Error fetching tools:', err.message);
    //         }
    //     };
    //     getAddTools();
    // }, []);

    const handleToolLogic = (resCat) => {
        if (resCat?.Require_Tool) {
            dispatch(setShowToolSel(true));
            if (toolList.length > 0) {
                dispatch(setSelectedTool(toolList[0]._id));
            }
        } else {
            dispatch(setShowToolSel(false));
            dispatch(setSelectedTool(''));
        }
    };

    // handle Tools count
    const handleToolChange = (index, type) => {
        const updated = toolCounts.map((item, i) => {
            if (i !== index) return item;

            const currentTimes = Number(item?.Times) || 1;

            return {
                ...item,
                Times:
                    type === "increase"
                        ? currentTimes + 1
                        : currentTimes > 1
                            ? currentTimes - 1
                            : 1,
            };
        });

        dispatch(setToolCounts(updated));
    };

    const handlePageChange = (e) => {
        const val = e.target.value;
        if (val === '') {
            dispatch(setNumPages(''));
            dispatch(setError(''));
            return;
        }
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed)) {
            dispatch(setNumPages(parsed));
            if (parsed < minPage) {
                dispatch(setError(`Minimum Page allowed is ${minPage}`));
            } else if (parsed > maxPage) {
                dispatch(setError(`Maximum Page allowed is ${maxPage}`));
            } else {
                dispatch(setError(''));
            }
        }
    };

    const handlePageBlur = () => {
        let valp = parseInt(numPages, 10);

        if (isNaN(valp)) {
            dispatch(setNumPages(minPage));
            dispatch(setError(''));
            return;
        }
        if (valp < minPage) valp = minPage;
        if (valp > maxPage) valp = maxPage;
        dispatch(setNumPages(valp));
        dispatch(setError(''));
    };

    const handleWordChange = (e) => {
        const value = e.target.value;

        if (value === '') {
            dispatch(setNumWords(''));
            dispatch(setError(''));
            return;
        }
        const parsed = parseInt(value, 10);
        if (!isNaN(parsed)) {
            dispatch(setNumWords(parsed));

            if (parsed < minWord) {
                dispatch(setError(`Minimum Word allowed is ${minWord}`));
            } else if (parsed > maxWord) {
                dispatch(setError(`Maximum Word allowed is ${maxWord}`));
            } else {
                dispatch(setError(''));
            }
        }
    };

    const handleWordBlur = () => {
        let valw = parseInt(numWords, 10);

        if (isNaN(valw)) {
            dispatch(setNumWords(minWord));
            dispatch(setError(''));
            return;
        }
        if (valw < minWord) valw = minWord;
        if (valw > maxWord) valw = maxWord;
        dispatch(setNumWords(valw));
        dispatch(setError(''));

    };

    const totalPrice = useMemo(() => {
        const base = selectedCurrency === 'inr' ? methodPrice || 0 : methodDollarPrice || 0;

        const addonsTotal = Object.values(selectedAddons).reduce(
            (sum, item) =>
                sum +
                (selectedCurrency === 'inr'
                    ? Number(item?.Inr_Price) || 0
                    : Number(item?.Dollar_Price) || 0),
            0
        );

        const toolTotal = showToolSel
            ? toolCounts.reduce((sum, item) => {
                const tool = toolList.find((t) => t._id === item._id);
                if (!tool) return sum;

                const price = selectedCurrency === 'inr'
                    ? Number(tool.Inr_Price) || 0
                    : Number(tool.Dollar_Price) || 0;

                return sum + price * (item.Times || 1);
            }, 0)
            : 0;

        const pageTotal =
            selectedUnit === 'page'
                ? selectedCurrency === 'inr'
                    ? Number(calculatedPagePrice) || 0
                    : Number(calculatedDollarPagePrice) || 0
                : 0;

        const wordTotal =
            selectedUnit === 'word'
                ? selectedCurrency === 'inr'
                    ? Number(calculatedWordPrice) || 0
                    : Number(calculatedDollarWordPrice) || 0
                : 0;

        return base + addonsTotal + toolTotal + pageTotal + wordTotal;
    }, [
        selectedUnit,
        selectedCurrency,
        methodPrice,
        methodDollarPrice,
        calculatedPagePrice,
        calculatedDollarPagePrice,
        calculatedWordPrice,
        calculatedDollarWordPrice,
        selectedAddons,
        showToolSel,
        toolCounts,
        toolList,
    ]);

    let totalAddonDiscount = 0;
    let totalToolDiscount = 0;
    let contentDiscount = 0;

    // Addon Discount
    if (Object.keys(selectedAddons).length > 0) {
        for (const [, item] of Object.entries(selectedAddons)) {
            const price = selectedCurrency === 'inr'
                ? Number(item?.Inr_Price) || 0
                : Number(item?.Dollar_Price) || 0;

            const discount = Number(item?.Discount) || 0;

            if (discount > 0) {
                totalAddonDiscount += (price * discount) / 100;
            }
        }
    }

    // Tool Discount
    if (toolCounts.length > 0) {
        for (const item of toolCounts) {
            const tool = toolList.find(t => t._id === item._id);
            if (!tool) continue;

            const price = selectedCurrency === 'inr'
                ? Number(tool.Inr_Price) || 0
                : Number(tool.Dollar_Price) || 0;

            const discount = Number(tool?.Discount) || 0;

            const times = Number(item.Times) || 1;

            if (discount > 0) {
                const discountAmount = (price * discount / 100) * times;
                totalToolDiscount += discountAmount;
            }
        }
    }

    // Page/Word Discount
    if (selectedUnit === 'page') {
        const pagePrice = selectedCurrency === 'inr'
            ? Number(calculatedPagePrice) || 0
            : Number(calculatedDollarPagePrice) || 0;

        const pageDiscount = Number(discount) || 0;

        if (pageDiscount > 0) {
            contentDiscount = (pagePrice * pageDiscount) / 100;
        }
    } else if (selectedUnit === 'word') {
        const wordPrice = selectedCurrency === 'inr'
            ? Number(calculatedWordPrice) || 0
            : Number(calculatedDollarWordPrice) || 0;

        const wordDiscount = Number(discount) || 0;

        if (wordDiscount > 0) {
            contentDiscount = (wordPrice * wordDiscount) / 100;
        }
    }

    // Final Total Discount
    const finalTotalDiscount = totalAddonDiscount + totalToolDiscount + contentDiscount;

    const discountPercentage = totalPrice > 0
        ? (finalTotalDiscount / totalPrice) * 100
        : 0;

    const discountedPrice = totalPrice - finalTotalDiscount;

    //gst amount
    const gstAmount = useMemo(() => {
        return selectedCurrency === 'inr' ? discountedPrice * 0.18 : 0;
    }, [discountedPrice, selectedCurrency]);

    const finalPrice = useMemo(() => {
        return selectedCurrency === 'inr' ? discountedPrice + gstAmount : discountedPrice;
    }, [discountedPrice, gstAmount, selectedCurrency]);

    // for pdf generation...
    const service = useMemo(() => {
        return {
            selectedService: {
                label: serviceData?.Name,
            },

            TandE: tande,
            Desc: desc,

            selectedMethod: {
                label: selectedMethod,
                type: selectedValue,
            },

            Addons: Object.values(selectedAddons).map(item => ({
                Name: item?.Name,
                Price:
                    selectedCurrency === "inr"
                        ? Number(item?.Inr_Price) || 0
                        : Number(item?.Dollar_Price) || 0,
            })),

            ToolUp: toolCounts.map(tool => {
                const toolData = toolList.find(t => t._id === tool._id);
                return {
                    Name: toolData?.Name,
                    Times: tool.Times,
                    Price:
                        selectedCurrency === "inr"
                            ? Number(toolData?.Inr_Price) || 0
                            : Number(toolData?.Dollar_Price) || 0,
                };
            }),

            Demand: selectedUnit === "page" ? "Page" : "Word",

            calculationResult: {
                total: totalPrice,
                discount: finalTotalDiscount,
                payable: finalPrice,
                totalContainer: selectedUnit === "page" ? numPages : numWords,
            },
        };
    }, [
        serviceData,
        tande,
        desc,
        selectedMethod,
        selectedValue,
        selectedAddons,
        toolCounts,
        toolList,
        selectedCurrency,
        selectedUnit,
        numPages,
        numWords,
        totalPrice,
        finalTotalDiscount,
        finalPrice,
    ]);

    const userData = {
        UserName: "John Doe",
        Phone: "1234567890",
    };

    const payload = useMemo(() => {
        if (!tande?.length || !desc?.length) {
            return null;
        }

        return buildPdfPayload(service, userData);
    }, [service, userData, tande, desc]);
    // End Pdf data code ...

    // if (loading) {
    //     return <div className="text-center text-xl font-semibold py-40 h-[60vh]">Loading...</div>;
    // }

    // ✅ AFTER ALL HOOKS
    if (isLoading) {
        return <Loading />;
    }

    if (!serviceData) {
        return <div className="text-center text-red-700 text-xl font-semibold h-[60vh] py-40">Service not found</div>;
    }

    // ✅ Build payload
    // const payload = buildPdfPayload(service, userData);

    return (
        <>
            <div className='pt-20 w-full'>
                <div className='bg-[#223F4B] lg:bg-addon-bg h-fit lg:h-screen bg-no-repeat bg-cover bg-center'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 h-fit lg:h-full pt-[5vw]'>
                        <div className='hidden lg:flex'></div>
                        <div className='flex flex-col justify-center items-center ps-12 lg:ps-40 pe-12 lg:pe-28'>
                            <div>
                                <h6 className='text-[32px] lg:text-[2.5vw] font-medium text-center text-white font-poppins pb-3'>{serviceData.Name}</h6>
                                <p className='text-[14px] font-medium text-center text-white font-poppins pb-8'>{serviceData.Description}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center bg-white h-full rounded-t-2xl w-full py-10'>
                                <h6 className='text-[22px] lg:text-[1.6vw] font-medium text-center text-black font-poppins pb-0'>{selectedMethod}</h6>
                                <p className='text-[14px] font-medium text-center text-black font-poppins pb-8 px-10'>Add your own custom field regarding service type select your research category and role and reference writing.</p>
                                {methodPrice != null || inrBelowtpPrice != null ? (
                                    <p className="pb-4 text-[26px] font-bold">
                                        ₹{(methodPrice ?? inrBelowtpPrice).toLocaleString('en-IN')}
                                    </p>
                                ) : (
                                    <p className="mt-2 text-red-600">Price not available</p>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="w-full py-10 lg:py-20 px-8 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-9 gap-8 lg:gap-20 pb-2">
                    <div className="col-span-1 lg:col-span-5 ">
                        {/* Select buttons */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                            <div className='w-full'>
                                <label className='font-poppins text-[12px] text-gray-700'>Method Name</label>
                                <select
                                    className="block w-full border-2 border-gray-300 p-2 lg:p-4 rounded-full text-gray-500 tracking-wide text-[13px] lg:text-[16px] font-roboto mt-1"
                                    onChange={handleMethodChange}
                                    value={selectedMethod}
                                >
                                    {serviceData?.Method?.length > 0 ? (
                                        serviceData.Method.map((method, idx) => (
                                            <option key={idx} value={method.Name}>
                                                {method.Name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No Method</option>
                                    )}
                                </select>
                            </div>
                            <div className='w-full'>
                                <label className='font-poppins text-[12px] text-gray-700'>Method Type</label>
                                <select
                                    className=" block border-2 w-full border-gray-300 p-2 lg:p-4 rounded-full text-gray-500 tracking-wide text-[13px] lg:text-[16px] font-roboto mt-1"
                                    onChange={handleValueChange}
                                    value={selectedValue}
                                    disabled={!selectedMethod}
                                >
                                    {serviceData?.Method?.find(method => method.Name === selectedMethod)?.Values?.map((value, idx) => (
                                        <option key={idx} value={value}>
                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                        </option>
                                    )) || <option disabled>No Values</option>}
                                </select>
                            </div>
                        </div>
                        <div className='bg-[#223F4B] text-white flex justify-center py-2 rounded-lg'>
                            <h5 className="text-sm tracking-wide font-bold font-poppins">{selectedMethod}</h5>
                        </div>
                        {/* Form */}
                        <form className='py-4 font-poppins'>
                            <div className="mb-4 ">
                                <label htmlFor="selectOption1" className="block text-[14px] font-medium text-gray-700 mb-1">
                                    Select Research Category
                                </label>
                                <select
                                    className="border-2 border-gray-300 w-full p-2 rounded-lg shadow-custom12 text-[14px]"
                                    value={selectedResCatId}
                                    onChange={handleResCatChange} id="selectOption2"
                                >
                                    {filteredResCats.map(cat => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.Name}
                                        </option>
                                    )) || <option disabled>No Research Category</option>}
                                </select>
                            </div>
                            <div className='grid grid-cols-2 gap-x-12'>

                                {/* Add-on dropdowns */}
                                {addonCategories.map(cat => (
                                    <div key={cat._id} className='mb-5'>
                                        <label className="block text-[14px] font-medium text-gray-700 mb-1">
                                            Select {cat.Name}
                                        </label>
                                        <select
                                            className="border-2 border-gray-300 w-full p-2 rounded-lg shadow-custom12 text-[14px]"
                                            value={selectedAddons[cat._id]?._id || ''}
                                            onChange={(e) => handleAddonItemChange(cat._id, e.target.value)}
                                        >
                                            {cat.Addons_Item?.map(item => (
                                                <option key={item._id} value={item._id}>{item.Name}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {showToolSel && (
                                    <div className="mt-2">
                                        <label className="block text-[14px] font-medium text-gray-700 mb-1">Select Tool</label>
                                        {
                                            <Select
                                                isMulti
                                                closeMenuOnSelect={false}
                                                value={selectedTool}
                                                onChange={(selectedOptions) => {
                                                    dispatch(setSelectedTool(selectedOptions));
                                                    // initialize counts
                                                    const updatedCounts = selectedOptions.map(({ value, label }) => {
                                                        const existing = toolCounts.find(t => t._id === value);
                                                        return existing ? existing : { _id: value, Name: label, Times: 1 };
                                                    });
                                                    dispatch(setToolCounts(updatedCounts));
                                                }}
                                                options={toolList.map(tool => ({ value: tool._id, label: tool.Name }))}
                                                className="border text-black border-gray-300 w-full rounded-lg shadow-custom12 text-[14px]"
                                            />
                                        }
                                    </div>
                                )}
                            </div>

                            {/* increase decrease tool Count */}
                            {toolCounts.map((item, index) => (
                                <div key={item._id} className="flex items-center gap-3 mt-3 text-sm text-gray-800">
                                    <span className="font-medium">{item.Name}:</span>
                                    <button
                                        type="button"
                                        className="px-2 bg-red-200 text-red-700 rounded"
                                        onClick={() => handleToolChange(index, 'decrease')}
                                        disabled={item.Times <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center">{item.Times}</span>
                                    <button
                                        type="button"
                                        className="px-2  bg-green-200 text-green-700 rounded"
                                        onClick={() => handleToolChange(index, 'increase')}
                                    >
                                        +
                                    </button>
                                </div>
                            ))}

                            <div>
                                <div className="grid gap-4 grid-cols-1 mt-6">
                                    {selectedUnit === 'page' && numPages !== undefined && maxPage !== undefined && (
                                        <div className='flex mt-4 items-center gap-4 lg:gap-8'>
                                            <label className='font-poppins text-[12px] lg:text-[14px]'>No. of Pages</label>
                                            <input
                                                type="number"
                                                className='bg-[#223F4B] py-1 lg:py-2 px-8 rounded-lg text-center text-white w-full lg:w-40'
                                                min={minPage}
                                                max={maxPage}
                                                value={numPages ?? ''}
                                                onChange={handlePageChange} onBlur={handlePageBlur}
                                            />

                                        </div>
                                    )}
                                    {selectedUnit === 'word' && numWords !== undefined && maxWord !== undefined && (
                                        <div className='flex mt-4 items-center gap-4 lg:gap-8'>
                                            <label className='font-poppins text-[12px] lg:text-[14px]'>No. of Words</label>
                                            <input
                                                type="number"
                                                className='bg-[#223F4B] py-1 lg:py-2 px-8 rounded-lg text-center text-white w-full lg:w-40'
                                                min={minWord}
                                                max={maxWord}
                                                value={numWords ?? ''}
                                                onChange={handleWordChange} onBlur={handleWordBlur}
                                            />
                                        </div>
                                    )}
                                    {error && (
                                        <div className="text-red-400 text-sm italic ml-2">{error}</div>
                                    )}
                                </div>

                            </div>
                        </form>

                        {/* Pdf section */}
                        <div className="mt-6">
                            <PdfDownloadButton payload={payload} />
                        </div>

                    </div>
                    <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-20 self-start">
                        <p className='py-4 font-extrabold text-[#002631] font-poppins text-[16px]'>Price Data</p>
                        <div className="border-2 bg-[#223F4B] py-4 px-6 text-white rounded-2xl h-full flex flex-col justify-between">
                            <div>
                                <div className="pb-4 grid grid-cols-4 gap-3 border-b border-white">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="page"
                                            name="firstSet"
                                            value="page"
                                            className="mr-2"
                                            checked={selectedUnit === 'page'}
                                            onChange={() => dispatch(setSelectedUnit('page'))}
                                        />
                                        <label htmlFor="page" className="text-sm">Page</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="word"
                                            name="firstSet"
                                            value="word"
                                            className="mr-2"
                                            checked={selectedUnit === 'word'}
                                            onChange={() => dispatch(setSelectedUnit('word'))}
                                        />
                                        <label htmlFor="word" className="text-sm">Word</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="inr"
                                            name="currency"
                                            value="inr"
                                            className="mr-2"
                                            checked={selectedCurrency === 'inr'}
                                            onChange={(e) => dispatch(setSelectedCurrency(e.target.value))}
                                        />
                                        <label htmlFor="inr" className="text-sm">Rupee</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="usd"
                                            name="currency"
                                            value="usd"
                                            className="mr-2"
                                            checked={selectedCurrency === 'usd'}
                                            onChange={(e) => dispatch(setSelectedCurrency(e.target.value))}
                                        />
                                        <label htmlFor="usd" className="text-sm">Dollar </label>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div>
                                        <div className="flex justify-between font-poppins mb-4">
                                            <div className="bg-[#223F4B] py-2 px-2 rounded-lg text-start text-white text-[14px] font-thin space-y-1">
                                                <div>Base Price : </div>
                                            </div>
                                            <div className="font-poppins space-y-1 text-end">
                                                {/* Method Base Price */}
                                                <div className="bg-[#223F4B] pt-0 rounded-lg text-white text-[28px] font-bold">
                                                    {selectedCurrency === 'inr'
                                                        ? `₹${methodPrice ??
                                                        (selectedUnit === 'page'
                                                            ? inrBelowtpPrice
                                                            : inrBelowtwPrice) ??
                                                        0
                                                        }`
                                                        : `${methodDollarPrice ??
                                                        (selectedUnit === 'page'
                                                            ? dollarBelowtpPrice
                                                            : dollarBelowtwPrice) ??
                                                        0
                                                        }`}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between font-poppins mb-4">
                                            <div className="bg-[#223F4B] py-2 px-2 rounded-lg text-start text-white text-[14px] font-thin space-y-1">
                                                <div>Addons Price : </div>
                                            </div>
                                            <div className="font-poppins text-end">

                                                {/* Addon Prices */}
                                                {Object.keys(selectedAddons).length > 0 ? (() => {
                                                    let totalDiscountAmount = 0;

                                                    const addonItems = Object.entries(selectedAddons).map(([catId, item]) => {
                                                        const isINR = selectedCurrency === 'inr';
                                                        const price = isINR
                                                            ? Number(item?.Inr_Price) || 0
                                                            : Number(item?.Dollar_Price) || 0;

                                                        const discount = Number(item?.Discount) || 0;
                                                        const hasDiscount = discount > 0;

                                                        const discountedAmount = hasDiscount ? (price * discount) / 100 : 0;
                                                        const priceAfterDiscount = price - discountedAmount;

                                                        totalDiscountAmount += discountedAmount;

                                                        return (
                                                            <div
                                                                key={catId}
                                                                className="bg-[#223F4B] pt-2 border-b mb-3 border-white text-[#e1e0e0] italic text-[12px] font-extralight"
                                                            >
                                                                (
                                                                <span className="text-white font-semibold">{item?.Name}</span> :{' '}
                                                                {isINR ? `₹${price}` : `$${price}`}
                                                                )
                                                                {hasDiscount && (
                                                                    <div>
                                                                        <span className="text-white font-semibold">Discount</span> ({discount}%): {isINR ? `₹${discountedAmount}` : `$${discountedAmount}`}
                                                                        <hr className="border-white my-1" />
                                                                        <div>
                                                                            Price after Discount:{' '}
                                                                            <span className="text-white font-semibold">
                                                                                {/* ₹{Math.round(priceAfterDiscount).toLocaleString('en-IN')} */}
                                                                                {isINR
                                                                                    ? `₹${Math.round(priceAfterDiscount).toLocaleString('en-IN')}`
                                                                                    : `$${Math.round(priceAfterDiscount).toLocaleString('en-US')}`}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    });

                                                    return (
                                                        <>
                                                            {addonItems}
                                                            {totalDiscountAmount > 0 && (
                                                                <div className="mt-4 text-white font-semibold text-sm">
                                                                    Total Discount on Addons:{' '}
                                                                    ₹{Math.round(totalDiscountAmount).toLocaleString('en-IN')}
                                                                </div>
                                                            )}
                                                        </>
                                                    );
                                                })() : (
                                                    <div className="text-[#e1e0e0] italic text-[12px] font-extralight">
                                                        No addons available
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="flex justify-between font-poppins mb-4">
                                            <div className="bg-[#223F4B] py-2 px-2 rounded-lg text-start text-white text-[14px] font-thin space-y-1">
                                                <div>Tools Price : </div>
                                            </div>
                                            <div className="font-poppins space-y-1 text-end">
                                                {toolCounts.length > 0 ? (() => {
                                                    let totalToolDiscount = 0;

                                                    const toolItems = toolCounts.map((item) => {
                                                        const tool = toolList.find(t => t._id === item._id);
                                                        if (!tool) return null;

                                                        const isINR = selectedCurrency === 'inr';
                                                        const price = isINR ? Number(tool.Inr_Price) || 0 : Number(tool.Dollar_Price) || 0;
                                                        const discount = Number(tool?.Discount) || 0;
                                                        const times = Number(item.Times) || 1;

                                                        const totalPrice = price * times;
                                                        const discountAmount = discount > 0 ? (price * discount / 100) * times : 0;
                                                        const priceAfterDiscount = totalPrice - discountAmount;
                                                        totalToolDiscount += discountAmount;

                                                        return (
                                                            <div key={item._id} className="bg-[#223F4B] pt-3 border-b mb-3 border-white text-[13px] text-[#e1e0e0] italic">
                                                                <span className="text-white font-semibold">{item.Name}: </span> ({times} × {isINR ? `₹${price}` : `$${price}`}):{' '}
                                                                {isINR ? `₹${totalPrice}` : `$${totalPrice}`}
                                                                {discount > 0 && (
                                                                    <>
                                                                        <div>
                                                                            <span className="text-white font-semibold">Discount</span> ({discount}%): {isINR ? `₹${discountAmount}` : `$${discountAmount}`}
                                                                        </div>
                                                                        <hr className="border-white my-1" />
                                                                        <div>
                                                                            Price after Discount: <span className="text-white font-semibold">₹{Math.round(priceAfterDiscount).toLocaleString('en-IN')}</span>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        );
                                                    });
                                                    return (
                                                        <>
                                                            {toolItems}
                                                            {totalToolDiscount > 0 && (
                                                                <div className="pt-4 text-white font-semibold text-sm">
                                                                    Total Discount on Tools: ₹{Math.round(totalToolDiscount).toLocaleString('en-IN')}
                                                                </div>
                                                            )}
                                                        </>
                                                    );
                                                })() : (
                                                    <div className="mt-1 text-[12px] text-[#e1e0e0] italic">
                                                        No tool available
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {selectedUnit === 'page' && numPages && thresholdPage && (
                                            <div className="flex justify-between font-poppins mb-4">
                                                <div className="bg-[#223F4B] py-2 px-2 rounded-lg text-start text-white text-[14px] font-thin space-y-1">
                                                    <div>Page Price:</div>
                                                </div>
                                                <div className="font-poppins space-y-1 text-end">
                                                    {(() => {
                                                        const isINR = selectedCurrency === 'inr';
                                                        const pagePrice = isINR ? Number(calculatedPagePrice) || 0 : Number(calculatedDollarPagePrice) || 0;
                                                        const pageDiscount = Number(discount) || 0;
                                                        const discountAmount = (pagePrice * pageDiscount) / 100;
                                                        const priceAfterDiscount = pagePrice - discountAmount;

                                                        return (
                                                            <div className="text-sm text-[#e1e0e0] font-medium">
                                                                <p className="pt-1 font-semibold text-sm text-[#e1e0e0]">
                                                                    Price : <span className="text-white text-lg">
                                                                        {isINR ? `₹${Math.round(pagePrice)}` : `$${Math.round(pagePrice)}`}
                                                                    </span>
                                                                </p>

                                                                {Number(numPages) <= Number(thresholdPage) ? (
                                                                    <p className="text-[#e1e0e0]">
                                                                        Calc. : {isINR ? `₹${inrBelowtpPrice}` : `$${dollarBelowtpPrice}`} × {numPages} =
                                                                        <span className="text-white"> {isINR ? `₹${Math.round(pagePrice)}` : `$${Math.round(pagePrice)}`}</span>
                                                                    </p>
                                                                ) : (
                                                                    <>
                                                                        <p className="text-[#e1e0e0]">
                                                                            Calc. : {isINR ? `₹${inrBelowtpPrice}` : `$${dollarBelowtpPrice}`} Up to {thresholdPage} + {isINR ? `₹${inrAbovetpPrice}` : `$${dollarAbovetpPrice}`} Above:
                                                                        </p>
                                                                        <p className="text-[#e1e0e0]">
                                                                            {thresholdPage} × {isINR ? `₹${inrBelowtpPrice}` : `$${dollarBelowtpPrice}`} + ({numPages} - {thresholdPage}) × {isINR ? `₹${inrAbovetpPrice}` : `$${dollarAbovetpPrice}`} =
                                                                            <span className="text-white"> {isINR ? `₹${Math.round(pagePrice)}` : `$${Math.round(pagePrice)}`}</span>
                                                                        </p>
                                                                    </>
                                                                )}

                                                                {pageDiscount > 0 && (
                                                                    <>
                                                                        <p className="text-[#e1e0e0]">
                                                                            <span className="text-white font-semibold">Discount</span> ({pageDiscount}%): {isINR ? `₹${Math.round(discountAmount)}` : `$${Math.round(discountAmount)}`}
                                                                        </p>
                                                                        <hr className="my-1 border-white" />
                                                                        <p className="text-white border-b border-white">
                                                                            Price after Discount: <span className="font-bold text-white">
                                                                                {isINR
                                                                                    ? `₹${Math.round(priceAfterDiscount).toLocaleString('en-IN')}`
                                                                                    : `$${Math.round(priceAfterDiscount).toLocaleString('en-US')}`}
                                                                            </span>
                                                                        </p>
                                                                        <div className="pt-4 text-white font-semibold text-sm">
                                                                            Total Discount on Pages: {isINR ? `₹${Math.round(discountAmount)}` : `$${Math.round(discountAmount)}`}
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        )}

                                        {selectedUnit === 'word' && numWords && thresholdWord && (
                                            <div className="flex justify-between font-poppins mb-4">
                                                <div className="bg-[#223F4B] py-2 px-2 rounded-lg text-start text-white text-[14px] font-thin space-y-1">
                                                    <div>Word Price:</div>
                                                </div>
                                                <div className="font-poppins space-y-1 text-end">
                                                    {selectedCurrency === 'inr' ? (() => {
                                                        const wordDiscount = Number(discount) || 0;
                                                        const wordPrice = Number(calculatedWordPrice) || 0;

                                                        const discountAmount = (wordPrice * wordDiscount) / 100;
                                                        const priceAfterDiscount = wordPrice - discountAmount;

                                                        return (
                                                            <div className="text-sm text-[#e1e0e0] font-medium">
                                                                <p className="pt-1 font-semibold text-sm text-[#e1e0e0]">
                                                                    Price : <span className="text-white text-lg">₹{Math.round(calculatedWordPrice)}</span>
                                                                </p>
                                                                {Number(numWords) <= Number(thresholdWord) ? (
                                                                    <div>
                                                                        <p className="text-[#e1e0e0]">
                                                                            Calc. : ₹{inrBelowtwPrice} Up to {thresholdWord} : ({numWords} * ₹{inrBelowtwPrice}) =
                                                                            <span className="text-white"> ₹{Math.round(calculatedWordPrice)}</span>
                                                                        </p>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <p className="text-[#e1e0e0]">
                                                                            Calc. : ₹{inrBelowtwPrice} Up to {thresholdWord} + ₹{inrAbovetwPrice} Above to {thresholdWord}:
                                                                        </p>
                                                                        <p className="text-[#e1e0e0]">
                                                                            {thresholdWord} * ₹{inrBelowtwPrice} + ({numWords} - {thresholdWord}) * ₹{inrAbovetwPrice} =
                                                                            <span className="text-white"> ₹{Math.round(calculatedWordPrice)}</span>
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                {wordDiscount > 0 && (
                                                                    <>
                                                                        <p className="text-[#e1e0e0]">
                                                                            <span className="text-white font-semibold">Discount</span> ({wordDiscount}%): ₹{Math.round(discountAmount)}
                                                                        </p>
                                                                        <hr className="my-1 border-white" />
                                                                        <p className="text-white border-b border-white">
                                                                            Price after Discount: <span className="text-white font-semibold">₹{Math.round(priceAfterDiscount).toLocaleString('en-IN')}</span>
                                                                        </p>
                                                                        <div className="pt-4 text-white font-semibold text-sm">
                                                                            Total Discount on Words: ₹{Math.round(discountAmount)}
                                                                        </div>
                                                                    </>
                                                                )}

                                                            </div>
                                                        );
                                                    })() : (
                                                        <div className="text-sm text-[#e1e0e0] font-medium">
                                                            <p className="pt-1 font-semibold text-sm text-[#e1e0e0]">
                                                                Price : <span className="text-white text-lg">${Math.round(calculatedDollarWordPrice)}</span>
                                                            </p>
                                                            {Number(numWords) <= Number(thresholdWord) ? (
                                                                <p className="text-[#e1e0e0]">
                                                                    Calc. : ${dollarBelowtwPrice} Up to {thresholdWord} : ({numWords} * ${dollarBelowtwPrice}) =
                                                                    <span className="text-blue-400"> ${Math.round(calculatedDollarWordPrice)}</span>
                                                                </p>
                                                            ) : (
                                                                <>
                                                                    <p className="text-[#e1e0e0]">
                                                                        Calc. : ${dollarBelowtwPrice} Up to {thresholdWord} + ${dollarAbovetwPrice} Above to {thresholdWord}:
                                                                    </p>
                                                                    <p className="text-[#e1e0e0]">
                                                                        {thresholdWord} * ${dollarBelowtwPrice} + ({numWords} - {thresholdWord}) * ${dollarAbovetwPrice} =
                                                                        <span className="text-blue-400"> ${Math.round(calculatedDollarWordPrice)}</span>
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2 text-[16px] text-white">
                                <div className="flex justify-between border-t pt-4 border-white">
                                    <span>Total Price ({selectedCurrency === 'inr' ? '₹' : '$'}):</span>
                                    <span className="font-semibold">
                                        {selectedCurrency === 'inr'
                                            ? `₹${Math.round(totalPrice).toLocaleString('en-IN')}`
                                            : `$${Math.round(totalPrice).toLocaleString('en-US')}`}
                                    </span>
                                </div>
                                {finalTotalDiscount > 0 && (
                                    <div className="flex justify-between font-poppins">
                                        <div className="bg-[#223F4B] rounded-lg text-start text-white text-[14px] font-thin space-y-1">
                                            <div>Total Discount ({discountPercentage.toFixed(2)}%) ({selectedCurrency === 'inr' ? '₹' : '$'}):</div>
                                        </div>
                                        <div className="font-poppins text-end">
                                            <div className="bg-[#223F4B] pt-0 rounded-lg text-[#00E400] font-semibold">
                                                -{selectedCurrency === 'inr'
                                                    ? `₹${Math.round(finalTotalDiscount).toLocaleString('en-IN')}`
                                                    : `$${Math.round(finalTotalDiscount).toLocaleString('en-US')}`}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between font-poppins">
                                    <div className="bg-[#223F4B] rounded-lg text-start text-white text-[14px] font-thin space-y-1">
                                        <div>Final Price ({selectedCurrency === 'inr' ? '₹' : '$'}):</div>
                                    </div>
                                    <div className="font-poppins space-y-1 text-end">
                                        <div className="bg-[#223F4B] pt-0 rounded-lg text-white font-semibold">
                                            <span className="font-semibold">
                                                {selectedCurrency === 'inr'
                                                    ? `₹${Math.round(discountedPrice).toLocaleString('en-IN')}`
                                                    : `$${Math.round(discountedPrice).toLocaleString('en-US')}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {selectedCurrency === 'inr' && (
                                    <div className="flex justify-between">
                                        <span>GST (18%):</span>
                                        <span className="font-semibold">
                                            +₹{Math.round(gstAmount).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                )}

                                <hr className="border-white my-2" />
                                <div className="flex justify-between  text-[24px]">
                                    <div>Net Payable Price ({selectedCurrency === 'inr' ? '₹' : '$'}):</div>
                                    <div className='text-blue-400'>
                                        {selectedCurrency === 'inr'
                                            ? `₹${Math.round(finalPrice).toLocaleString('en-IN')}`
                                            : `$${Math.round(finalPrice).toLocaleString('en-US')}`}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetail;
