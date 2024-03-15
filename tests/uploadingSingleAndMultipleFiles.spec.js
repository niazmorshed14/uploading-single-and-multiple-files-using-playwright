import {test, expect} from '@playwright/test';

test ("Uploading single file", async({page})=>{ 

    await page.goto("https://www.foundit.in/");
    await page.waitForTimeout(3000);
    await page.waitForSelector(".mqfihd-upload");
    await page.waitForTimeout(2000);
    await page.locator(".mqfihd-upload").setInputFiles("upload files/test file 1.docx");
    await page.waitForTimeout(3000);

}); 

test.only ("Uploading Multiple Files", async({page})=>{
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    await page.waitForTimeout(1000);
    await page.locator("#filesToUpload")
            .setInputFiles(["upload files\test file 1.docx", 
                            "upload files\test file 2.docx"]);

    await page.waitForTimeout(3000);
    
    //assertions of file uplaod
    await expect(page.locator("#fileList li:nth-child(1)")).toHaveText("test file 1.docx");
    await expect(page.locator("#fileList li:nth-child(2)")).toHaveText("test file 2.docx");

    //removing the selected files
    await page.locator("#filesToUpload")
            .setInputFiles([]); //to remove we need to pass just an empty array
    await page.waitForTimeout(3000);
    
    //assertions of removal
    await expect(page.locator("//li[normalize-space()='No Files Selected']")).toHaveText("No Files Selected");


});
