"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";
import { Copy, RefreshCw, Check } from "lucide-react";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const generatePassword = useCallback(() => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === "") {
      alert("请至少选择一种字符类型！");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Toast
        message="恭喜🎉复制成功"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">密码生成器</CardTitle>
          <CardDescription className="text-base">
            生成安全、随机的密码来保护您的账户
          </CardDescription>
        </CardHeader>
      <CardContent className="space-y-6">
        {/* 密码显示区域 */}
        <div className="space-y-2">
          <Label htmlFor="password">生成的密码</Label>
          <div className="flex gap-2">
            <Input
              id="password"
              value={password}
              readOnly
              placeholder="点击生成按钮创建密码"
              className="font-mono text-lg"
            />
            <Button
              onClick={copyToClipboard}
              disabled={!password}
              variant="outline"
              size="icon"
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 密码长度滑块 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>密码长度</Label>
            <span className="text-sm font-medium">{length[0]} 字符</span>
          </div>
          <Slider
            value={length}
            onValueChange={setLength}
            min={8}
            max={64}
            step={1}
            className="w-full"
          />
        </div>

        {/* 字符类型选项 */}
        <div className="space-y-3">
          <Label>包含字符类型</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
              />
              <Label
                htmlFor="uppercase"
                className="text-sm font-normal cursor-pointer"
              >
                大写字母 (A-Z)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
              />
              <Label
                htmlFor="lowercase"
                className="text-sm font-normal cursor-pointer"
              >
                小写字母 (a-z)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
              />
              <Label
                htmlFor="numbers"
                className="text-sm font-normal cursor-pointer"
              >
                数字 (0-9)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
              />
              <Label
                htmlFor="symbols"
                className="text-sm font-normal cursor-pointer"
              >
                特殊字符 (!@#$...)
              </Label>
            </div>
          </div>
        </div>

        {/* 生成按钮 */}
        <Button
          onClick={generatePassword}
          className="w-full"
          size="lg"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          生成密码
        </Button>
      </CardContent>
    </Card>
    </>
  );
}
